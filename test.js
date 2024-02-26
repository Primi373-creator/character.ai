import CharacterAI from 'node-character.ai';

export class Test {
  public static async sendMessage(message: string): Promise<string[]> {
    const characterAi = new CharacterAI();

    try {
      // accessToken is required; keep reading for details.
      await characterAi.authenticate(process.env.CHARACTERAI_TOKEN);

      // you can find your characterId in the URL of a Character's chat page. Keep reading for details.
      const chat = await characterAi.continueOrCreateChat(
        process.env.CHARACTERAI_CHARID,
      );

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
