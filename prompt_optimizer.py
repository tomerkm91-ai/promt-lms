import os
from dotenv import load_dotenv
from crewai import Agent, Task, Crew, Process
from langchain_openai import ChatOpenAI

# 1. טעינת מפתחות API מסודרת מקובץ .env
load_dotenv()

# הגדרת מודל השפה המרכזי (LLM) שיניע את הסוכנים
# ניתן להחליף ל-Claude או DeepSeek בהתאם לצורך
llm = ChatOpenAI(
    model="gpt-4o",
    temperature=0.2 # טמפרטורה נמוכה לטובת לוגיקה ואופטימיזציה מדויקת
)

# --- הגדרת הסוכנים (Agents) ---

# סוכן 1: המבקר (The Prompt Critic)
critic_agent = Agent(
    role="Prompt Critic and Analyst",
    goal="Analyze the given prompt, identify weaknesses, missing context, ambiguities, or lack of constraints.",
    backstory="""You are an expert AI prompt engineer. You know exactly why prompts fail. 
    Your job is to look at a prompt, break it down using the Anatomy of a Prompt principles 
    (Role, Context, Constraints, etc.), and provide a brutal but constructive critique.""",
    verbose=True,
    llm=llm
)

# סוכן 2: המשפר (The Prompt Optimizer)
optimizer_agent = Agent(
    role="Prompt Optimization Expert",
    goal="Take the original prompt and the critic's feedback, and rewrite the prompt to be perfect.",
    backstory="""You are a master of advanced prompt engineering techniques (Few-shot, Chain of Thought, explicit constraints).
    You take raw, weak prompts and transform them into enterprise-grade prompts that guarantee high-quality LLM outputs.""",
    verbose=True,
    llm=llm
)


# --- הגדרת המשימות (Tasks) ---

# משימה 1: ניתוח הפרומפט
def create_tasks(original_prompt: str):
    analysis_task = Task(
        description=f"""Analyze the following prompt:
        '{original_prompt}'
        
        Identify what is missing based on best practices: Is there a clear Role? Are constraints explicit? 
        Is the output format defined? Provide a structured breakdown of the prompt's flaws and areas for improvement.""",
        expected_output="A structured markdown report detailing the weaknesses and improvement points of the prompt.",
        agent=critic_agent
    )

    # משימה 2: שכתוב ואופטימיזציה
    optimization_task = Task(
        description=f"""Take the original prompt: '{original_prompt}' AND the critique from the previous task.
        Rewrite the prompt into an optimized version. Use advanced techniques like setting a clear Role, 
        adding Context, defining clear Constraints, and specifying the Output Format.
        Provide the final prompt inside a clear code block, followed by an explanation of what you changed and why.""",
        expected_output="An optimized, ready-to-use version of the prompt with a brief explanation of the changes made.",
        agent=optimizer_agent
    )
    
    return [analysis_task, optimization_task]


# --- פונקציית ההרצה המרכזית ---
def run_prompt_optimization(user_prompt: str):
    print("\n🚀 Starting Multi-Agent Prompt Optimization Workflow...\n")
    
    tasks = create_tasks(user_prompt)
    
    # הקמת ה"צוות" וקביעת תהליך עבודה סדרתי (Sequential)
    crew = Crew(
        agents=[critic_agent, optimizer_agent],
        tasks=tasks,
        process=Process.sequential,
        verbose=True
    )
    
    # הרצת התהליך
    result = crew.kickoff()
    return result

if __name__ == "__main__":
    # פרומפט לדוגמה (חלש ומעורפל) שהסטודנטים עשויים לכתוב
    test_prompt = "Write an email to my boss asking for a raise because I worked hard this year."
    
    final_output = run_prompt_optimization(test_prompt)
    
    print("\n================ FINAL RESULT ================\n")
    print(final_output)