ROLE_LIBRARY = {
    "CEO": {
        "responsibilities": [
            "Set company vision",
            "Make strategic decisions"
        ],
        "decision_authority": "Company strategy",
        "reporting_to": None
    },

    "CTO": {
        "responsibilities": [
            "Lead engineering",
            "Own technical roadmap"
        ],
        "decision_authority": "Technical architecture",
        "reporting_to": "CEO"
    },

    "Product Manager": {
        "responsibilities": [
            "Define product roadmap",
            "Prioritize features"
        ],
        "decision_authority": "Product direction",
        "reporting_to": "CEO"
    },

    "AI Engineer": {
        "responsibilities": [
            "Build AI models",
            "Optimize prompts",
            "Deploy AI services"
        ],
        "decision_authority": "AI implementation",
        "reporting_to": "CTO"
    },

    "Frontend Engineer": {
        "responsibilities": [
            "Develop frontend",
            "Improve UX",
            "Maintain UI"
        ],
        "decision_authority": "Frontend implementation",
        "reporting_to": "CTO"
    },

    "Backend Engineer": {
        "responsibilities": [
            "Develop backend services",
            "Design APIs",
            "Manage databases"
        ],
        "decision_authority": "Backend implementation",
        "reporting_to": "CTO"
    },

    "Marketing Lead": {
        "responsibilities": [
            "Plan campaigns",
            "Manage branding",
            "Increase user acquisition"
        ],
        "decision_authority": "Marketing strategy",
        "reporting_to": "CEO"
    },

    "HR Manager": {
        "responsibilities": [
            "Manage hiring strategy",
            "Oversee employee relations",
            "Build company culture"
        ],
        "decision_authority": "People Operations",
        "reporting_to": "CEO"
    },

    "Recruiter": {
       "responsibilities": [
          "Source candidates",
          "Conduct interviews",
          "Coordinate hiring process"
        ],
        "decision_authority": "Talent Acquisition",
        "reporting_to": "HR Manager"
    }
}

EVOLUTION_RULES = {

    "engineering_team_large": {
        "spawn": [
            "Engineering Manager",
            "DevOps Engineer"
        ]
    },

    "security_incident": {
        "spawn": [
            "Security Officer"
        ]
    },

    "rapid_growth": {
        "spawn": [
            "HR Manager",
            "Recruiter"
        ]
    }

}