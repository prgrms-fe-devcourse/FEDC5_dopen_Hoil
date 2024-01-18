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
    <Accordion allowToggle>
      <AccordionItem border="0">
        <AccordionButton>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel
          pos="absolute"
          w="100%"
          right="0"
          maxWidth="100px"
          zIndex="100"
        >
          <Box>{children}</Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Settings;
