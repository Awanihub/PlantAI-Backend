import Chat from "../models/chat.model";

export const getOrCreateChat =
  async (
    userId: string,
    plantScanId: string
  ) => {
    let chat =
      await Chat.findOne({
        userId,
        plantScanId,
      });

    if (!chat) {
      chat =
        await Chat.create({
          userId,
          plantScanId,

          messages: [],

          expiresAt:
            new Date(
              Date.now() +
                30 * 60 * 1000
            ),
        });
    }

    return chat;
  };

export const addMessage =
  async (
    chatId: string,

    role:
      | "user"
      | "assistant",

    content: string
  ) => {
    return await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: {
          messages: {
            role,
            content,
          },
        },

        expiresAt:
          new Date(
            Date.now() +
              30 * 60 * 1000
          ),
      },
      {
        new: true,
      }
    );
  };

export const getLast10Messages =
  async (
    chatId: string
  ) => {
    const chat =
      await Chat.findById(chatId);

    if (!chat) {
      return [];
    }

    return chat.messages.slice(
      -10
    );
  };

export const deleteUserSession =
  async (
    userId: string
  ) => {
    const PlantScan =
      (
        await import(
          "../models/plantScan.model"
        )
      ).default;

    await Chat.deleteMany({
      userId,
    });

    await PlantScan.deleteMany({
      userId,
    });
  };