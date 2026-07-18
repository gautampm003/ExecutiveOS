import os
from dotenv import load_dotenv
from typing import Optional

load_dotenv()

class Config:
    """Application configuration"""
    
    # API Keys
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")
    NITROCLOUD_API_KEY: str = os.getenv("NITROCLOUD_API_KEY", "")
    
    # Server
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    
    # MCP Configuration
    MCP_ENABLED: bool = os.getenv("MCP_ENABLED", "True").lower() == "true"
    MCP_NITROSTACK_URL: str = os.getenv("MCP_NITROSTACK_URL", "http://localhost:3000")
    MCP_NITROCHAT_URL: str = os.getenv("MCP_NITROCHAT_URL", "http://localhost:3001")
    MCP_NITROSTUDIO_URL: str = os.getenv("MCP_NITROSTUDIO_URL", "http://localhost:3002")
    
    # Organization Settings
    MAX_AGENTS: int = int(os.getenv("MAX_AGENTS", "50"))
    AUTO_SPAWN_ROLES: bool = os.getenv("AUTO_SPAWN_ROLES", "True").lower() == "true"
    
    # Claude Model
    CLAUDE_MODEL: str = os.getenv("CLAUDE_MODEL", "claude-sonnet-4-6")
    CLAUDE_MAX_TOKENS: int = int(os.getenv("CLAUDE_MAX_TOKENS", "2048"))

config = Config()
