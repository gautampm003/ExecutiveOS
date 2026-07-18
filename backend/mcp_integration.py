"""
MCP Integration for Nitrostack tools
Connects FastAPI backend with Nitrocloud, NitroChat, and NitroStudio
"""

import httpx
from typing import Dict, Any, Optional, List
import json
from config import config

class MCPClient:
    """Client for MCP server communication"""
    
    def __init__(self, base_url: str, timeout: int = 30):
        self.base_url = base_url
        self.timeout = timeout
        self.client = httpx.AsyncClient(timeout=timeout)
    
    async def call_tool(self, tool_name: str, args: Dict[str, Any]) -> Dict[str, Any]:
        """Call a tool on the MCP server"""
        try:
            response = await self.client.post(
                f"{self.base_url}/tool/{tool_name}",
                json=args
            )
            return response.json()
        except Exception as e:
            return {"error": str(e), "tool": tool_name}
    
    async def close(self):
        await self.client.aclose()

class NitrostackMCP(MCPClient):
    """Nitrostack MCP tools"""
    
    async def create_server(self, project_name: str) -> Dict[str, Any]:
        """Create MCP server"""
        return await self.call_tool("create_server", {"project_name": project_name})
    
    async def deploy_agent(self, agent_config: Dict[str, Any]) -> Dict[str, Any]:
        """Deploy agent to Nitrocloud"""
        return await self.call_tool("deploy_agent", agent_config)

class NitrochatMCP(MCPClient):
    """NitroChat MCP for agent communication"""
    
    async def send_message(self, agent_id: str, message: str, context: Optional[Dict] = None) -> Dict[str, Any]:
        """Send message to agent"""
        return await self.call_tool("send_message", {
            "agent_id": agent_id,
            "message": message,
            "context": context or {}
        })
    
    async def create_conversation(self, participants: List[str]) -> Dict[str, Any]:
        """Create multi-agent conversation"""
        return await self.call_tool("create_conversation", {
            "participants": participants
        })

class NitrostudioMCP(MCPClient):
    """NitroStudio MCP for testing and deployment"""
    
    async def test_tools(self, tool_names: List[str]) -> Dict[str, Any]:
        """Test tools in NitroStudio"""
        return await self.call_tool("test_tools", {"tools": tool_names})
    
    async def run_dev_server(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Run dev server with hot reload"""
        return await self.call_tool("run_dev_server", config)

# Singleton instances
nitrostack_mcp: Optional[NitrostackMCP] = None
nitrochat_mcp: Optional[NitrochatMCP] = None
nitrostudio_mcp: Optional[NitrostudioMCP] = None

async def init_mcp_clients():
    """Initialize MCP clients"""
    global nitrostack_mcp, nitrochat_mcp, nitrostudio_mcp
    
    if config.MCP_ENABLED:
        nitrostack_mcp = NitrostackMCP(config.MCP_NITROSTACK_URL)
        nitrochat_mcp = NitrochatMCP(config.MCP_NITROCHAT_URL)
        nitrostudio_mcp = NitrostudioMCP(config.MCP_NITROSTUDIO_URL)

async def close_mcp_clients():
    """Close MCP client connections"""
    if nitrostack_mcp:
        await nitrostack_mcp.close()
    if nitrochat_mcp:
        await nitrochat_mcp.close()
    if nitrostudio_mcp:
        await nitrostudio_mcp.close()

# Tool definitions for Claude
NITROSTACK_TOOLS = [
    {
        "name": "deploy_agent",
        "description": "Deploy an AI agent to Nitrocloud",
        "input_schema": {
            "type": "object",
            "properties": {
                "agent_name": {"type": "string"},
                "role": {"type": "string"},
                "capabilities": {"type": "array", "items": {"type": "string"}}
            }
        }
    },
    {
        "name": "query_nitrocloud",
        "description": "Query deployed agents or resources",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string"}
            }
        }
    }
]

NITROCHAT_TOOLS = [
    {
        "name": "send_agent_message",
        "description": "Send message to an agent via NitroChat",
        "input_schema": {
            "type": "object",
            "properties": {
                "agent_id": {"type": "string"},
                "message": {"type": "string"}
            }
        }
    },
    {
        "name": "create_board_meeting",
        "description": "Create multi-agent conversation for board meeting",
        "input_schema": {
            "type": "object",
            "properties": {
                "participants": {"type": "array", "items": {"type": "string"}},
                "topic": {"type": "string"}
            }
        }
    }
]

ALL_MCP_TOOLS = NITROSTACK_TOOLS + NITROCHAT_TOOLS
