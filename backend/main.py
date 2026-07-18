from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import json
import asyncio
from datetime import datetime
from organization_rules import ROLE_LIBRARY, EVOLUTION_RULES
import os
from mcp_client import ExecutiveOSMCP
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()   # <-- This MUST come before creating the client
mcp = ExecutiveOSMCP()

async def call_llm(prompt: str) -> str:
    provider = os.getenv("LLM_PROVIDER", "nitrostack")

    if provider == "nitrostack":
        return await call_nitrostack(prompt)

    elif provider == "anthropic":
        return await call_anthropic(prompt)

    raise ValueError(f"Unsupported LLM provider: {provider}")
app = FastAPI(title="Living Organization Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# Models
# ============================================================================

class AgentRole(BaseModel):
    """Dynamic agent role definition"""
    title: str
    responsibilities: List[str]
    decision_authority: str
    reporting_to: Optional[str] = None

class OrganizationRequest(BaseModel):
    """Request to create/query organization"""
    query: str
    context: Optional[Dict[str, Any]] = None
    roles_needed: Optional[List[str]] = None

class EvolutionRequest(BaseModel):
     """Request to evolve the organization"""
     event: str

class DecisionRequest(BaseModel):
    """Request for organizational decision"""
    topic: str
    context: Dict[str, Any]
    required_roles: Optional[List[str]] = None

class OrganizationEvent(BaseModel):
    """An event in the organization's history"""

    timestamp: str
    event_type: str
    actor: str
    description: str
    details: Dict[str, Any] = {}

class OrganizationState(BaseModel):
    """Current state of the living organization"""
    created_at: str
    active_agents: Dict[str, AgentRole]
    decisions: List[Dict[str, Any]]
    history: List[OrganizationEvent]
    metrics: Dict[str, Any]

# ============================================================================
# In-memory storage (replace with DB in production)
# ============================================================================

org_state: OrganizationState = OrganizationState(
    created_at=datetime.now().isoformat(),
    active_agents={},
    decisions=[],
    history=[],
    metrics={"decisions_made": 0, "agents_spawned": 0}
)

# ============================================================================
# Core Agent Functions
# ============================================================================

async def spawn_agent(role: str, responsibilities: List[str], decision_authority: str, reporting_to: Optional[str] = None) -> AgentRole:
    """Dynamically create an agent role in the organization"""
    agent = AgentRole(
        title=role,
        responsibilities=responsibilities,
        decision_authority=decision_authority,
        reporting_to=reporting_to
    )
    org_state.active_agents[role] = agent
    org_state.metrics["agents_spawned"] += 1
    return agent

async def log_event(
    event_type: str,
    actor: str,
    description: str,
    details: Dict[str, Any]
):
    org_state.history.append(
        OrganizationEvent(
            timestamp=datetime.now().isoformat(),
            event_type=event_type,
            actor=actor,
            description=description,
            details=details
        )
    )

async def generate_organization_structure(query: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
    """Generate organization structure without using an LLM"""

    roles = (context or {}).get("roles_needed", [])

    # Default roles if none are provided
    if not roles:
        roles = [
            "CEO",
            "CTO",
            "Product Manager"
        ]

    role_templates = ROLE_LIBRARY

    required_roles = []

    for role in roles:
        template = role_templates.get(role, {
            "responsibilities": ["Execute responsibilities"],
            "decision_authority": "Role decisions",
            "reporting_to": "CEO"
        })

        required_roles.append({
            "title": role,
            "responsibilities": template["responsibilities"],
            "decision_authority": template["decision_authority"],
            "reporting_to": template["reporting_to"]
        })

    return {
        "required_roles": required_roles,
        "rationale": f"Created organization for: {query}"
    }

async def orchestrate_decision(
    topic: str, 
    context: Dict[str, Any], 
    required_roles: List[str]
) -> Dict[str, Any]:
    """Orchestrate multi-agent decision-making"""
    print(">>> ENTERED orchestrate_decision")
    # Build agent briefing
    agent_briefing = f"""You are running a board meeting to decide on: {topic}

Context: {json.dumps(context)}

Required perspectives from: {', '.join(required_roles)}

Each agent should:
1. State their perspective based on their role
2. Identify key risks/opportunities
3. Propose action

Format response as:
{{
  "decisions": {{"role": "decision", "reasoning": "why"}},
  "consensus": "agreement or conflict",
  "action_items": ["item1", "item2"]
}}"""

    print(">>> ABOUT TO CALL call_llm")
    response = await call_llm(agent_briefing)
    
    try:
        clean = response.replace("```json", "").replace("```", "").strip()
        decision_result = json.loads(clean)
    except:
        decision_result = {"raw_response": response}
    
    # Log decision
    org_state.decisions.append({
        "topic": topic,
        "timestamp": datetime.now().isoformat(),
        "roles_consulted": required_roles,
        "result": decision_result
    })
    org_state.metrics["decisions_made"] += 1
    
    return decision_result

# ============================================================================
# API Routes
# ============================================================================

@app.get("/health")
async def health():
    """Health check"""
    return {"status": "ok", "timestamp": datetime.now().isoformat()}

@app.get("/org/state")
async def get_org_state():
    """Get current organization state"""
    return org_state.model_dump()

@app.get("/org/graph")
async def get_org_graph():
    """Return the organization as a graph for visualization."""

    nodes = []
    edges = []

    for _, agent in org_state.active_agents.items():
        # Create a node for each role
        nodes.append({
            "id": agent.title,
            "label": agent.title
        })

        # Create an edge from manager -> employee
        if agent.reporting_to:
            edges.append({
                "source": agent.reporting_to,
                "target": agent.title
            })

    return {
        "nodes": nodes,
        "edges": edges
    }

@app.post("/org/create")
async def create_organization(request: OrganizationRequest):
    print("=== CREATE ORG CALLED ===")

    context = request.context or {}
    context["roles_needed"] = request.roles_needed or []

    structure = await generate_organization_structure(
        request.query,
        context
    )

    print("Generated structure:", structure)

    spawned_roles = []

    for role_config in structure.get("required_roles", []):
        print("Spawning:", role_config)

        agent = await spawn_agent(
            role_config["title"],
            role_config.get("responsibilities", []),
            role_config.get("decision_authority", "General Decisions"),
            role_config.get("reporting_to")
        )

        spawned_roles.append(agent.model_dump())

    await log_event(
      event_type="organization_created",
      actor="System",
      description=f"Created organization from query: {request.query}",
      details={
        "roles": [role["title"] for role in spawned_roles],
        "organization_id": "org_" + datetime.now().strftime("%Y%m%d_%H%M%S")
      }
    )
    print("Active agents:", org_state.active_agents)

    return {
        "organization_id": "org_" + datetime.now().strftime("%Y%m%d_%H%M%S"),
        "rationale": structure.get("rationale"),
        "spawned_roles": spawned_roles,
        "org_state": org_state.model_dump()
    }

@app.post("/org/decision")
async def make_decision(request: DecisionRequest):
    """Make a decision through the organization"""
    print(">>> ENTERED /org/decision")
    # Auto-determine roles if not specified
    if not request.required_roles:
        roles_prompt = f"For this topic: '{request.topic}', what roles should be consulted? Return JSON: {{'roles': ['role1', 'role2']}}"
        roles_response = await call_llm(roles_prompt)
        try:
            clean = roles_response.replace("```json", "").replace("```", "").strip()
            request.required_roles = json.loads(clean).get("roles", list(org_state.active_agents.keys()))
        except:
            request.required_roles = list(org_state.active_agents.keys())
    print(">>> ABOUT TO CALL orchestrate_decision")
    # Orchestrate decision
    decision = await orchestrate_decision(
        request.topic,
        request.context,
        request.required_roles
    )
    
    return {
        "decision_id": f"dec_{len(org_state.decisions)}",
        "topic": request.topic,
        "decision": decision,
        "timestamp": datetime.now().isoformat()
    }

@app.post("/org/spawn-role")
async def spawn_role(role_name: str, responsibilities: List[str], reporting_to: Optional[str] = None):
    """Spawn a new role dynamically"""
    
    agent = await spawn_agent(role_name, responsibilities, reporting_to)
    return {"role": agent.model_dump(), "total_agents": len(org_state.active_agents)}

@app.get("/org/decisions")
async def get_decisions(limit: int = 10):
    """Get recent decisions"""
    return org_state.decisions[-limit:]

@app.post("/org/stream-session")
async def stream_org_session(request: OrganizationRequest):
    """Stream a live organization session (for real-time updates)"""
    
    async def event_generator():
        yield f"data: {json.dumps({'type': 'init', 'message': 'Starting organization session'})}\n\n"
        
        # Generate org structure
        structure = await generate_organization_structure(request.query, request.context)
        yield f"data: {json.dumps({'type': 'structure', 'data': structure})}\n\n"
        
        # Spawn roles
        for role_config in structure.get("required_roles", []):
            agent = await spawn_agent(
                role_config["title"],
                role_config.get("responsibilities", []),
                role_config.get("decision_authority", "General Decisions"),
                role_config.get("reporting_to")
            )
            yield f"data: {json.dumps({'type': 'agent_spawned', 'agent': agent.model_dump()})}\n\n"
            await asyncio.sleep(0.1)  # Small delay for streaming effect
        
        yield f"data: {json.dumps({'type': 'complete', 'org_state': org_state.model_dump()})}\n\n"
    
    return StreamingResponse(event_generator(), media_type="text/event-stream")

@app.post("/org/evolve")
async def evolve_organization(request: EvolutionRequest):
    if not org_state.active_agents:
       return {
        "success": False,
        "message": "No organization exists. Please call /org/create first."
    }
    
    rule = EVOLUTION_RULES.get(request.event)

    if not rule:
        return {
            "success": False,
            "message": f"Unknown event: {request.event}"
        }

    spawned = []

    for role in rule["spawn"]:

    # Skip roles that already exist
     if role in org_state.active_agents:
        continue

    # Look up the role in ROLE_LIBRARY
     role_info = ROLE_LIBRARY.get(
        role,
        {
            "responsibilities": ["To be defined"],
            "decision_authority": "General Decisions",
            "reporting_to": "CEO"
        }
    )

     agent = await spawn_agent(
        role,
        role_info["responsibilities"],
        role_info["decision_authority"],
        role_info["reporting_to"]
    )

     spawned.append(agent.model_dump())

    await log_event(
      event_type="organization_evolved",
      actor="System",
      description=f"Organization evolved due to '{request.event}'",
      details={
        "trigger": request.event,
        "spawned_roles": [role["title"] for role in spawned]
     }
    )

    return {
        "success": True,
        "event": request.event,
        "spawned_roles": spawned,
        "organization": org_state.model_dump()
    }

@app.get("/org/history")
async def get_organization_history():
    """Return the organization's event history."""
    return {
        "events": [event.model_dump() for event in org_state.history]
    }

# ============================================================================
# WebSocket for real-time board meetings (optional)
# ============================================================================

from fastapi import WebSocket

@app.websocket("/ws/board-meeting/{meeting_id}")
async def websocket_board_meeting(websocket: WebSocket, meeting_id: str):
    """Real-time board meeting via WebSocket"""
    await websocket.accept()
    
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            if message.get("type") == "decision_query":
                decision = await orchestrate_decision(
                    message.get("topic", ""),
                    message.get("context", {}),
                    message.get("roles", list(org_state.active_agents.keys()))
                )
                await websocket.send_text(json.dumps({
                    "type": "decision_result",
                    "decision": decision
                }))
            
            elif message.get("type") == "spawn_role":
                agent = await spawn_agent(
                    message.get("role_name", ""),
                    message.get("responsibilities", []),
                    message.get("decision_authority", "General Decisions"),
                    message.get("reporting_to")
                )
                await websocket.send_text(json.dumps({
                    "type": "role_spawned",
                    "agent": agent.model_dump()
                }))
    
    except Exception as e:
        await websocket.send_text(json.dumps({"type": "error", "message": str(e)}))
    finally:
        await websocket.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
