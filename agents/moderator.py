import requests
import json

class ModeratorAgent:
	def run(self, context: dict) -> dict:
		# Expects context with persona_post from PersonaAgent
		persona_post = context.get("persona_post", {})
		asset = context.get("asset", "")
		price_change_pct = context.get("price_change_pct", "")
		behavior_label = context.get("behavior_label", "")

		headers = {
			"Authorization": "Bearer YOUR_OPENROUTER_API_KEY",
			"Content-Type": "application/json"
		}
		base_url = "https://openrouter.ai/api/v1/chat/completions"
		model = "meta-llama/llama-3.3-70b-instruct:free"

		def moderation_prompt(platform, post):
			return (
				f"Review this {platform} post about {asset} moving {price_change_pct}%: '{post}'. "
				f"Behavior label: {behavior_label}. "
				"Criteria: exaggeration, hype, emotional triggers, harmful patterns. "
				"Respond with a JSON object: { 'verdict': 'POST|WARN|BLOCK', 'reason': '<explanation>' }"
			)

		def query_openrouter(prompt):
			payload = {
				"model": model,
				"messages": [{"role": "user", "content": prompt}],
				"max_tokens": 200
			}
			try:
				response = requests.post(base_url, headers=headers, data=json.dumps(payload))
				response.raise_for_status()
				result = response.json()
				content = result["choices"][0]["message"]["content"].strip()
				return json.loads(content)
			except Exception as e:
				print(f"OpenRouter API error: {e}")
				return {"verdict": "WARN", "reason": "API error or invalid response."}

		moderation = {}
		for platform in ["x", "linkedin"]:
			post = persona_post.get(platform, "")
			prompt = moderation_prompt(platform, post)
			moderation[platform] = query_openrouter(prompt)
			print(f"Moderation for {platform}: {moderation[platform]}")

		context["moderation"] = moderation
		return context
