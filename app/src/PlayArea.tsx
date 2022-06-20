/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Animal from "@gamepark/awimbawe/Animal";
import AnimalCard from "./material/AnimalCard";

type Props = {
  bottomAnimal?: Animal;
  topAnimal?: Animal;
};

export default function PlayArea({ bottomAnimal, topAnimal }: Props) {
  return (
    <>
      {bottomAnimal && (
        <AnimalCard animal={bottomAnimal} css={bottomAnimalCss} />
      )}
      {topAnimal && <AnimalCard animal={topAnimal} css={topAnimalCss} />}
    </>
  );
}

const bottomAnimalCss = css`
  position: absolute;
  bottom: 35em;
  left: 80em;
`;

const topAnimalCss = css`
  position: absolute;
  top: 40em;
  right: 78em; //68vh
  transform: rotateZ(180deg);
`;
