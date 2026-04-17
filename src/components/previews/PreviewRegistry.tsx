import React from 'react';
import { ContainerPreview } from './ContainerPreview';
import { RowColumnPreview } from './RowColumnPreview';
import { CounterPreview } from './CounterPreview';
import { StackPreview } from './StackPreview';
import { SizeBoxPreview } from './SizeBoxPreview';
import { FlexibleExpandedPreview } from './FlexibleExpandedPreview';
import { RunAppPreview } from './RunAppPreview';
import { ScaffoldPreview } from './ScaffoldPreview';
import { TextWidgetPreview } from './TextWidgetPreview';
import { CenterWidgetPreview } from './CenterWidgetPreview';
import { ButtonInteractionsPreview } from './ButtonInteractionsPreview';
import { NavigationPreview } from './NavigationPreview';
import { ListViewPreview } from './ListViewPreview';
import { TextFieldPreview } from './TextFieldPreview';
import { useLanguage } from '@/src/i18n/LanguageContext';

export function PreviewRegistry({ lessonId }: { lessonId: string }) {
  const { t } = useLanguage();

  switch (lessonId) {
    case 'what-is-flutter':
    case 'what-is-dart':
    case 'app-structure':
    case 'hot-reload':
    case 'colors-styling':
    case 'reusable-widgets':
      return (
        <div className="p-8 text-center bg-gray-50 border border-dashed rounded-xl text-gray-500">
          {t('theoryLesson')}
        </div>
      );
    case 'main-runapp':
      return <RunAppPreview />;
    case 'materialapp-scaffold':
    case 'scaffold-deep':
      return <ScaffoldPreview />;
    case 'text-widget':
      return <TextWidgetPreview />;
    case 'center-widget':
      return <CenterWidgetPreview />;
    case 'container':
      return <ContainerPreview />;
    case 'sizedbox':
      return <SizeBoxPreview />;
    case 'row-column':
      return <RowColumnPreview />;
    case 'expanded-flexible':
      return <FlexibleExpandedPreview />;
    case 'stack':
      return <StackPreview />;
    case 'button-interactions':
      return <ButtonInteractionsPreview />;
    case 'navigation-concept':
      return <NavigationPreview />;
    case 'list-view':
      return <ListViewPreview />;
    case 'text-field':
      return <TextFieldPreview />;
    case 'counter':
    case 'stateless-stateful':
      return <CounterPreview />;
    default:
      return (
        <div className="p-8 text-center bg-gray-50 border border-dashed rounded-xl text-gray-500">
          {t('comingSoon')}
        </div>
      );
  }
}
