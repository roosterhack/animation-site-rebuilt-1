import styled, { css } from "styled-components";
import { motion } from "framer-motion";

interface FooterContentProps {
  wider?: boolean;
}

export const FooterNav = styled(motion.div)`
  height: 300px;
  margin-top: 296px;
`;

export const FooterContent = styled.div<FooterContentProps>`
  color: #ea281e;
  font-size: 22px;
  font-weight: 600;
  line-height: 8px;
  flex: 1;
  ${({ wider }) =>
    wider &&
    css`
      flex: 2;
    `}
`;

export const FooterSocial = styled.div`
  display: flex;
  position: relative;
  a {
    position: relative;
    display: block;
    width: 24px;
    height: 24px;
    padding: 8px;
    svg {
      width: 100%;
      height: 100%;
    }
  }
`;
