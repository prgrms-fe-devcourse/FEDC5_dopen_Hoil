import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionPanelProps,
  Box,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface SettingsProps extends AccordionPanelProps {
  children: ReactNode;
}

const Settings = ({ children }: SettingsProps) => {
  return (
    <Accordion allowToggle pos="relative">
      <AccordionItem border="0">
        <AccordionButton>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pos="absolute" w="60px">
          <Box>{children}</Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Settings;
