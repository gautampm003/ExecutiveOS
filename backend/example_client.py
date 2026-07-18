"""
Example client for Living Organization API
"""

import asyncio
import httpx
import json
from typing import Dict, Any

BASE_URL = "http://localhost:8000"

async def create_org_example():
    """Create a living organization"""
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{BASE_URL}/org/create",
            json={
                "query": "We need to enter the European market with a new product",
                "context": {
                    "budget": 5000000,
                    "timeline": "6 months",
                    "competitive_pressure": "high"
                }
            }
        )
        print("Organization Created:")
        print(json.dumps(response.json(), indent=2))
        return response.json()

async def make_decision_example():
    """Make a board decision"""
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{BASE_URL}/org/decision",
            json={
                "topic": "Should we acquire TechStartup Inc for $50M?",
                "context": {
                    "valuation": 50000000,
                    "market_fit": "excellent",
                    "integration_risk": "low",
                    "cultural_fit": "good"
                },
                "required_roles": ["CEO", "CFO", "CTO"]
            }
        )
        print("\nDecision Made:")
        print(json.dumps(response.json(), indent=2))

async def spawn_role_example():
    """Dynamically spawn a new role"""
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{BASE_URL}/org/spawn-role",
            params={
                "role_name": "Chief Data Officer",
                "responsibilities": ["data strategy", "ML operations", "analytics"],
                "reporting_to": "CEO"
            }
        )
        print("\nRole Spawned:")
        print(json.dumps(response.json(), indent=2))

async def get_org_state_example():
    """Get current organization state"""
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/org/state")
        print("\nCurrent Organization State:")
        print(json.dumps(response.json(), indent=2))

async def stream_session_example():
    """Stream organization creation with live updates"""
    async with httpx.AsyncClient() as client:
        with client.stream(
            "POST",
            f"{BASE_URL}/org/stream-session",
            json={
                "query": "Build a complete AI research division",
                "context": {"focus": "foundation models", "team_size": 20}
            }
        ) as response:
            print("\nStreaming Organization Session:")
            async for line in response.aiter_lines():
                if line.startswith("data: "):
                    data = json.loads(line[6:])
                    print(f"[{data.get('type')}]", json.dumps(data, indent=2))

async def get_decisions_example():
    """Get decision history"""
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/org/decisions?limit=5")
        print("\nRecent Decisions:")
        print(json.dumps(response.json(), indent=2))

async def main():
    """Run all examples"""
    print("=" * 60)
    print("Living Organization API Examples")
    print("=" * 60)
    
    try:
        await create_org_example()
        await spawn_role_example()
        await make_decision_example()
        await get_org_state_example()
        await get_decisions_example()
        # Uncomment to test streaming:
        # await stream_session_example()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
