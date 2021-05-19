import { NFTDataType } from "@zoralabs/nft-hooks";
import React, { useContext } from "react";

import { NFTDataContext } from "../context/NFTDataProvider";
import {
  MEDIA_URL_BASE_BY_NETWORK,
  VIEW_ETHERSCAN_URL_BASE_BY_NETWORK,
} from "../constants/media-urls";
import { useMediaContext } from "../context/useMediaContext";
import { InfoContainer } from "./InfoContainer";

const ProofLink = ({
  href,
  children,
  styles,
}: {
  href: string;
  children: string;
  styles: any;
}) => (
  <a {...styles} href={href} target="_blank">
    {children}
  </a>
);

export const ProofAuthenticity = () => {
  const {
    nft: { data },
  } = useContext(NFTDataContext);
  const { getString, getStyles, networkId } = useMediaContext();
  const linkStyles = getStyles("fullProofLink");

  const getContent = (nft: NFTDataType["nft"]) => (
    <React.Fragment>
      <ProofLink
        styles={linkStyles}
        href={`${VIEW_ETHERSCAN_URL_BASE_BY_NETWORK[networkId]}${nft.id}`}
      >
        {getString("ETHERSCAN_TXN")}
      </ProofLink>
      <ProofLink styles={linkStyles} href={nft.contentURI}>
        {getString("VIEW_IPFS")}
      </ProofLink>
      <ProofLink
        styles={linkStyles}
        href={`${MEDIA_URL_BASE_BY_NETWORK[networkId]}${nft.creator.id}/${nft.id}`}
      >
        {getString("VIEW_ZORA")}
      </ProofLink>
    </React.Fragment>
  );

  return (
    <InfoContainer titleString="PROOF_AUTHENTICITY" bottomPadding={false}>
      <div style={{height: '15px'}} />
      {data && getContent(data.nft)}
    </InfoContainer>
  );
};
