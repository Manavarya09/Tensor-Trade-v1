import requests
import json
import os
from dotenv import load_dotenv

class PersonaAgent:
    def __init__(self):
        """Initialize PersonaAgent with API key from environment."""
        # Load environment variables
        env_path = os.path.join(os.path.dirname(__file__), '.env')
        load_dotenv(dotenv_path=env_path)
        
        self.api_key = os.getenv("OPENROUTER_API_KEY", "YOUR_OPENROUTER_API_KEY")
        if self.api_key == "YOUR_OPENROUTER_API_KEY":
            print("WARNING: OpenRouter API key not found. Set 'OPENROUTER_API_KEY' environment variable.")

    def run(self, context: dict) -> dict:
        # Expects context with session_summary from NarratorAgent
        market_opinions = context.get("market_opinions", [])
        asset = context.get("asset", "")
        price_change_pct = context.get("price_change_pct", "")
        persona_style = context.get("persona_style", "Meme Style")

        merged_summary = " ".join(market_opinions)
        prompt_x = f"Format this as a viral, emoji-heavy tweet about {asset} moving {price_change_pct}%: {merged_summary}"
        prompt_linkedin = f"Format this as a professional LinkedIn post about {asset} moving {price_change_pct}%: {merged_summary}"

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        base_url = "https://openrouter.ai/api/v1/chat/completions"
        model = "meta-llama/llama-3.3-70b-instruct:free"

        def query_openrouter(prompt):
            if self.api_key == "YOUR_OPENROUTER_API_KEY":
                return f"[API key not configured - would generate: {prompt[:50]}...]"
            
            payload = {
                "model": model,
                "messages": [{"role": "user", "content": prompt}],
                "max_tokens": 200
            }
            try:
                response = requests.post(base_url, headers=headers, data=json.dumps(payload))
                response.raise_for_status()
                result = response.json()
                return result["choices"][0]["message"]["content"].strip()
            except Exception as e:
                print(f"OpenRouter API error: {e}")
                return f"[Error: {str(e)}]"

        x_post = query_openrouter(prompt_x)
        linkedin_post = query_openrouter(prompt_linkedin)

        context["persona_post"] = {
            "x": x_post,
            "linkedin": linkedin_post
        }
        print("X post:", x_post)
        print("LinkedIn post:", linkedin_post)
        return context
