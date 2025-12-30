import { ReactElement } from 'react';
import CallToAction from './shared/CallToAction';
import TabContentWrapper from './shared/TabContentWrapper';

interface ProblemContentProps {
  activeTab: 'visualize' | 'simulate' | 'code' | 'learn';
  gradient: string;
  callToAction: string;
  onVisualizeClick: () => void;
  onSimulateClick: () => void;
  explanationComponent: ReactElement;
  visualizerComponent: ReactElement;
  simulatorComponent: ReactElement;
  codeEditorComponent: ReactElement;
  visualizeTitle?: string;
  visualizeDescription?: string;
  simulateTitle?: string;
  simulateDescription?: string;
  codeTitle?: string;
  codeDescription?: string;
}

export default function ProblemContent({
  activeTab,
  gradient,
  callToAction,
  onVisualizeClick,
  onSimulateClick,
  explanationComponent,
  visualizerComponent,
  simulatorComponent,
  codeEditorComponent,
  visualizeTitle = 'Static Visualization',
  visualizeDescription = 'See the visual representation of the problem',
  simulateTitle = 'Algorithm Simulation',
  simulateDescription = 'Watch the algorithm execute step-by-step',
  codeTitle = 'Code Your Solution',
  codeDescription = 'Implement the solution function and run the test cases.',
}: ProblemContentProps) {
  if (activeTab === 'learn') {
    return (
      <div>
        {explanationComponent}
        <CallToAction
          gradient={gradient}
          subtitle={callToAction}
          onVisualizeClick={onVisualizeClick}
          onSimulateClick={onSimulateClick}
        />
      </div>
    );
  }

  if (activeTab === 'visualize') {
    return (
      <TabContentWrapper title={visualizeTitle} description={visualizeDescription}>
        {visualizerComponent}
      </TabContentWrapper>
    );
  }

  if (activeTab === 'simulate') {
    return (
      <>
        <TabContentWrapper title={simulateTitle} description={simulateDescription}>
          <div />
        </TabContentWrapper>
        {simulatorComponent}
      </>
    );
  }

  if (activeTab === 'code') {
    return (
      <>
        <TabContentWrapper title={codeTitle} description={codeDescription}>
          <div />
        </TabContentWrapper>
        {codeEditorComponent}
      </>
    );
  }

  return null;
}
