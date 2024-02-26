import CharacterAI from 'node-character.ai';

export class Test {
  public static async sendMessage(characterId: string, message: string): Promise<string[]> {
    const characterAi = new CharacterAI();

    try {
      // accessToken is required; keep reading for details.
      await characterAi.authenticate(process.env.CHARACTERAI_TOKEN);

      // create or continue chat with the specified characterId
      const chat = await characterAi.continueOrCreateChat(characterId);

      // send a message and wait for the response
      const response = await chat.sendAndAwaitResponse({
        message,
        singleReply: true, // if you want just what would show up in the chat, set this to true
      });

      // response can be either an array of possible responses or a single response
      console.log(response);

      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to send message to CharacterAI');
    }
  }
}
