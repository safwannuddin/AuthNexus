"""
Automation services package for AuthNexus.
Contains the automation agent and integration with n8n workflows.
"""
from .n8n_integration import automation_service
from .agent import automation_agent

__all__ = ["automation_service", "automation_agent"]
