"use client";

import Image from "next/image";

const ManifestoPage = () => {
  return (
    <div className="px-10 pt-20 flex items-center grow w-full pb-[8%]">
      <div className="w-1/3 aspect-[551/565] relative">
        <Image src="/artwork.png" layout="fill" alt="not found artwork" />
      </div>
      <div className="relative w-1/3">
        <p className="font-grotesk-medium text-3xl tracking-[-1px]">
          in process manifesto
        </p>
        <p className="font-grotesk-light text-md tracking-[-1px] pt-4">
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum urna vel libero suscipit, at sagittis lorem dignissim. Morbi dapibus velit lectus, ac aliquet lorem placerat non. Nam dictum ipsum vel porttitor placerat. Nunc suscipit elementum urna ut luctus. Donec odio est, laoreet quis condimentum vitae, auctor et sapien. Praesent at odio sit amet sem aliquam rhoncus ut sed tellus. Etiam consectetur porttitor dapibus. Nulla id metus vel lectus lacinia lobortis. Cras ornare pellentesque sodales. Ut nec arcu purus. Vivamus tempus, enim ut scelerisque sollicitudin, eros tellus lacinia ipsum, vel vestibulum lacus arcu a justo. Aenean accumsan at odio quis blandit. Vestibulum feugiat et ipsum ut mattis. Ut eu lectus turpis. In hac habitasse platea dictumst. Praesent et mollis justo, quis condimentum metus.

Quisque eget eleifend est, nec viverra nisi. Maecenas consequat rhoncus rhoncus. Sed sit amet sem in sapien viverra suscipit. Vestibulum nec nunc quis ipsum pretium ultricies at at elit. Duis suscipit ante id ultrices tincidunt. Pellentesque nisl urna, lobortis at leo in, vulputate laoreet enim. Mauris vitae quam vel orci convallis consectetur. Sed porta mi eu bibendum blandit. Aenean at velit sed metus scelerisque ullamcorper sit amet sed mi. Integer a mattis erat, non eleifend ipsum. Etiam lacinia massa tellus, quis faucibus turpis vehicula sed. Nam consectetur tempor tellus, a lacinia enim euismod faucibus. Fusce arcu purus, cursus vel elementum sit amet, fringilla ac ligula. Ut euismod mi eu fermentum laoreet. Nunc placerat, lectus eu aliquet auctor, felis sapien faucibus nisi, sit amet consequat justo sem ac sapien. Quisque euismod faucibus eros quis consectetur.`}
        </p>
        <div className="absolute right-[-18%] top-[calc(100%+4px)] w-[12.5%] aspect-[72/91]">
          <Image src="/sign2.png" alt="not found sign2" layout="fill" />
        </div>
        <div className="absolute right-[-15%] top-[calc(100%+20px)] w-[52%] aspect-[294/259]">
          <Image
            src="/sign0.png"
            alt="not found sign0"
            width={294}
            height={259}
          />
        </div>
      </div>
    </div>
  );
};

export default ManifestoPage;
