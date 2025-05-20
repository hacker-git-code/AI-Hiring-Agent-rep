from typing import Any, Dict, List
from langchain.agents import AgentType, initialize_agent
from langchain.tools import BaseTool
from app.agents.base import BaseAgent
from app.tools.resume import ResumeParserTool
from app.tools.interview import InterviewTool
from app.tools.matching import MatchingTool
from app.tools.coordination import CoordinationTool

class ScreenerAgent(BaseAgent):
    def __init__(self):
        tools = [
            ResumeParserTool(),
            MatchingTool()
        ]
        super().__init__(
            name="Screener",
            role="Resume Analysis & Candidate Triage",
            tools=tools,
            temperature=0.3
        )

    def _get_role_description(self) -> str:
        return """analyzing resumes, evaluating candidate qualifications, and performing initial screening.
        You should focus on:
        1. Extracting and validating candidate information
        2. Matching skills and experience to job requirements
        3. Identifying potential red flags
        4. Providing initial candidate ranking
        5. Generating screening questions"""

    def _create_agent(self) -> Any:
        return initialize_agent(
            self.tools,
            self.llm,
            agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
            verbose=True,
            handle_parsing_errors=True
        )

class InterviewerAgent(BaseAgent):
    def __init__(self):
        tools = [
            InterviewTool(),
            MatchingTool()
        ]
        super().__init__(
            name="Interviewer",
            role="Conducting Dynamic Interviews",
            tools=tools,
            temperature=0.7
        )

    def _get_role_description(self) -> str:
        return """conducting interviews and evaluating candidate responses.
        You should focus on:
        1. Asking relevant and probing questions
        2. Adapting questions based on responses
        3. Evaluating technical and soft skills
        4. Assessing cultural fit
        5. Providing detailed feedback"""

    def _create_agent(self) -> Any:
        return initialize_agent(
            self.tools,
            self.llm,
            agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
            verbose=True,
            handle_parsing_errors=True
        )

class MatcherAgent(BaseAgent):
    def __init__(self):
        tools = [
            MatchingTool(),
            CoordinationTool()
        ]
        super().__init__(
            name="Matcher",
            role="Culture & Skill Fit Analysis",
            tools=tools,
            temperature=0.5
        )

    def _get_role_description(self) -> str:
        return """analyzing candidate fit for roles and teams.
        You should focus on:
        1. Evaluating cultural alignment
        2. Assessing team compatibility
        3. Analyzing skill gaps
        4. Predicting performance
        5. Providing matching recommendations"""

    def _create_agent(self) -> Any:
        return initialize_agent(
            self.tools,
            self.llm,
            agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
            verbose=True,
            handle_parsing_errors=True
        )

class CoordinatorAgent(BaseAgent):
    def __init__(self):
        tools = [
            CoordinationTool(),
            InterviewTool(),
            MatchingTool()
        ]
        super().__init__(
            name="Coordinator",
            role="Workflow Orchestration",
            tools=tools,
            temperature=0.5
        )

    def _get_role_description(self) -> str:
        return """managing the hiring workflow and coordinating between agents.
        You should focus on:
        1. Orchestrating the hiring process
        2. Managing candidate pipeline
        3. Coordinating between agents
        4. Ensuring process compliance
        5. Providing process insights"""

    def _create_agent(self) -> Any:
        return initialize_agent(
            self.tools,
            self.llm,
            agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
            verbose=True,
            handle_parsing_errors=True
        ) 