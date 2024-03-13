import Image from "next/image";

interface Props {
  title: string;
  description: string;
  imgSrc: string;
}

export default function OnboardingItem({ title, description, imgSrc }: Props) {
  return (
    <>
      <Image src={imgSrc} width={350} height={350} alt={title} priority />
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
}
