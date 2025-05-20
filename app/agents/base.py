from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional
from langchain.agents import AgentExecutor, AgentType, initialize_agent
from langchain.memory import ConversationBufferMemory
from langchain.tools import BaseTool
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema import SystemMessage
from app.core.config import settings

class BaseAgent(ABC):
    def __init__(
        self,
        name: str,
        role: str,
        tools: List[BaseTool],
        temperature: float = 0.7
    ):
        self.name = name
        self.role = role
        self.tools = tools
        self.temperature = temperature
        self.llm = ChatOpenAI(temperature=temperature)
        self.memory = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True
        )
        self.agent = self._create_agent()

    @abstractmethod
    def _get_role_description(self) -> str:
        """Return a detailed description of the agent's role and responsibilities."""
        pass

    @abstractmethod
    def _create_agent(self) -> Any:
        """Create and return the LangChain agent instance."""
        pass

    def get_system_prompt(self) -> str:
        """Generate the system prompt for the agent."""
        return f"""You are {self.name}, an AI agent responsible for {self.role}.
        
        {self._get_role_description()}
        
        You should:
        1. Be professional and courteous
        2. Provide clear and concise responses
        3. Ask clarifying questions when needed
        4. Document your reasoning
        5. Follow best practices for your role
        
        Current conversation context:
        {self.memory.buffer}"""

    def run(self, input_text: str) -> str:
        """Run the agent with the given input."""
        try:
            response = self.agent.run(
                input_text,
                memory=self.memory
            )
            return response
        except Exception as e:
            return f"Error: {str(e)}"

    def clear_memory(self):
        """Clear the agent's conversation memory."""
        self.memory.clear()

    async def get_memory(self) -> Dict[str, Any]:
        """Get the agent's memory state."""
        return {
            "chat_history": self.memory.chat_memory.messages,
            "variables": self.memory.variables
        }

    async def clear_memory(self) -> None:
        """Clear the agent's memory."""
        self.memory.clear() 