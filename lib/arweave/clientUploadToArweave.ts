import {
  TurboFactory,
} from '@ardrive/turbo-sdk/web';
import { ReadableStream } from 'web-streams-polyfill';

TurboFactory.setLogLevel('debug');

const clientUploadToArweave = async (file: File): Promise<string | null> => {
  try {
    const ARWEAVE_KEY = JSON.parse(
      Buffer.from(process.env.NEXT_PUBLIC_ARWEAVE_KEY as string, "base64").toString(),
    );
    
    const turboClient: any = TurboFactory.authenticated({
      privateKey: ARWEAVE_KEY,
    });
    const buffer = await file.arrayBuffer();
    const upload = await turboClient.uploadFile({
      fileStreamFactory: () =>
        new ReadableStream({
          start(controller) {
            controller.enqueue(buffer);
            controller.close();
          },
        }),
      fileSizeFactory: () => file.size,
    });

    console.log('ziad', `Upload successful! ${JSON.stringify(upload, null, 2)}`)
    return "";
  } catch (error) {
    console.error("Error uploading to Arweave:", error);
    return null;
  }
};

export default clientUploadToArweave;
