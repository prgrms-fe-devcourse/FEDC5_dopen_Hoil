import { postRequest } from './instance';

interface CreateChannelPayload {
  description: string; // 채널 설명
  name: string; // 채널 이름
}

export const createChannel = async ({
  description,
  name,
}: CreateChannelPayload) =>
  await postRequest('/channels/create', {
    authRequired: true,
    description,
    name,
  });
