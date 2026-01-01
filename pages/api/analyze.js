import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { verse } = req.body;

  const prompt = `
너는 히브리어 구약 성경 원어 전문가다.
교단적 결론 단정 금지.
1. 히브리어 원문
2. 단어별 분석
3. 발음
4. 직역
5. 연구용 해석
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: verse }
    ]
  });

  res.status(200).json({ text: completion.choices[0].message.content });
}
