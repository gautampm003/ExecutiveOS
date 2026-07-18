# Living Organization Backend

FastAPI backend for dynamic AI-powered organization system using Anthropic's Claude and Nitrostack MCP tools.

## Quick Start

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Setup Environment
```bash
cp .env.example .env
# Edit .env with your API keys
```

### Run Server
```bash
python main.py
```

Server runs at `http://0.0.0.0:8000`

## API Endpoints

### Organization Management

**POST /org/create** - Create living organization
```json
{
  "query": "We need to decide on market expansion",
  "context": {
    "budget": 1000000,
    "timeline": "Q3"
  },
  "roles_needed": ["CEO", "CFO", "CTO"]
}
```

**GET /org/state** - Get current org state

**POST /org/spawn-role** - Dynamically add new role
```json
{
  "role_name": "CRO",
  "responsibilities": ["drive revenue", "manage partnerships"],
  "reporting_to": "CEO"
}
```

### Decision Making

**POST /org/decision** - Make organizational decision
```json
{
  "topic": "Should we acquire Company X?",
  "context": {
    "valuation": 50000000,
    "market_fit": "high",
    "integration_risk": "medium"
  },
  "required_roles": ["CEO", "CFO", "CTO"]
}
```

**GET /org/decisions** - Get decision history

### Real-Time

**POST /org/stream-session** - Stream org creation
Server-Sent Events endpoint for live updates during org setup.

**WS /ws/board-meeting/{meeting_id}** - Real-time board meeting
WebSocket for live multi-agent decision-making.

## Architecture

- **Agent Spawning**: Dynamic role creation based on query
- **Claude Integration**: LLM-powered decision orchestration
- **MCP Tools**: Nitrostack, NitroChat, NitroStudio integration
- **Streaming**: SSE and WebSocket support for real-time updates

## Key Features

1. **On-Demand Organization**: Roles spawn based on requirements
2. **Multi-Agent Orchestration**: Board meetings with multiple perspectives
3. **Decision Logging**: Track all organizational decisions
4. **MCP Integration**: Direct connection to Nitrostack tools
5. **Streaming Sessions**: Real-time progress updates

## Environment Variables

See `.env.example` for all configuration options.

Key ones:
- `ANTHROPIC_API_KEY`: Claude API key
- `MCP_ENABLED`: Enable MCP tool integration
- `MAX_AGENTS`: Maximum agents in organization
- `AUTO_SPAWN_ROLES`: Auto-create roles on demand
