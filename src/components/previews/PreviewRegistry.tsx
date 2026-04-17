import React, { Suspense, lazy } from 'react';
import { useLanguage } from '@/src/i18n/LanguageContext';

const previewMap: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'main-runapp': lazy(() => import('./RunAppPreview').then((module) => ({ default: module.RunAppPreview }))),
  'materialapp-scaffold': lazy(() => import('./ScaffoldPreview').then((module) => ({ default: module.ScaffoldPreview }))),
  'scaffold-deep': lazy(() => import('./ScaffoldPreview').then((module) => ({ default: module.ScaffoldPreview }))),
  'text-widget': lazy(() => import('./TextWidgetPreview').then((module) => ({ default: module.TextWidgetPreview }))),
  'center-widget': lazy(() => import('./CenterWidgetPreview').then((module) => ({ default: module.CenterWidgetPreview }))),
  container: lazy(() => import('./ContainerPreview').then((module) => ({ default: module.ContainerPreview }))),
  sizedbox: lazy(() => import('./SizeBoxPreview').then((module) => ({ default: module.SizeBoxPreview }))),
  'row-column': lazy(() => import('./RowColumnPreview').then((module) => ({ default: module.RowColumnPreview }))),
  'expanded-flexible': lazy(() => import('./FlexibleExpandedPreview').then((module) => ({ default: module.FlexibleExpandedPreview }))),
  stack: lazy(() => import('./StackPreview').then((module) => ({ default: module.StackPreview }))),
  'button-interactions': lazy(() =>
    import('./ButtonInteractionsPreview').then((module) => ({ default: module.ButtonInteractionsPreview }))
  ),
  'navigation-concept': lazy(() => import('./NavigationPreview').then((module) => ({ default: module.NavigationPreview }))),
  'list-view': lazy(() => import('./ListViewPreview').then((module) => ({ default: module.ListViewPreview }))),
  'text-field': lazy(() => import('./TextFieldPreview').then((module) => ({ default: module.TextFieldPreview }))),
  counter: lazy(() => import('./CounterPreview').then((module) => ({ default: module.CounterPreview }))),
  'stateless-stateful': lazy(() => import('./CounterPreview').then((module) => ({ default: module.CounterPreview }))),

  // Section 8
  'widget-tree': lazy(() => import('./WidgetTreePreview').then((module) => ({ default: module.WidgetTreePreview }))),
  'build-method': lazy(() => import('./BuildMethodPreview').then((module) => ({ default: module.BuildMethodPreview }))),
  'padding-widget': lazy(() => import('./PaddingWidgetPreview').then((module) => ({ default: module.PaddingWidgetPreview }))),
  'align-widget': lazy(() => import('./AlignWidgetPreview').then((module) => ({ default: module.AlignWidgetPreview }))),
  'safe-area': lazy(() => import('./SafeAreaPreview').then((module) => ({ default: module.SafeAreaPreview }))),
  'icons-images': lazy(() => import('./IconsImagesPreview').then((module) => ({ default: module.IconsImagesPreview }))),

  // Section 9
  'single-child-scrollview': lazy(() =>
    import('./SingleChildScrollViewPreview').then((module) => ({ default: module.SingleChildScrollViewPreview }))
  ),
  'list-tile': lazy(() => import('./ListTilePreview').then((module) => ({ default: module.ListTilePreview }))),
  'column-overflow': lazy(() =>
    import('./ColumnOverflowPreview').then((module) => ({ default: module.ColumnOverflowPreview }))
  ),

  // Section 10
  'text-field-deep': lazy(() =>
    import('./TextFieldDeepPreview').then((module) => ({ default: module.TextFieldDeepPreview }))
  ),
  'button-state': lazy(() => import('./ButtonStatePreview').then((module) => ({ default: module.ButtonStatePreview }))),
  'checkbox-switch-radio': lazy(() =>
    import('./SelectionControlsPreview').then((module) => ({ default: module.SelectionControlsPreview }))
  ),
  'dropdown-button': lazy(() =>
    import('./DropdownButtonPreview').then((module) => ({ default: module.DropdownButtonPreview }))
  ),
  'form-validation': lazy(() => import('./FormValidationPreview').then((module) => ({ default: module.FormValidationPreview }))),

  // Section 11
  'passing-data': lazy(() => import('./PassingDataPreview').then((module) => ({ default: module.PassingDataPreview }))),
  'named-routes': lazy(() => import('./NamedRoutesPreview').then((module) => ({ default: module.NamedRoutesPreview }))),
  'reusable-widgets-deep': lazy(() =>
    import('./ReusableWidgetsPreview').then((module) => ({ default: module.ReusableWidgetsPreview }))
  ),
  'theme-basics': lazy(() => import('./ThemeBasicsPreview').then((module) => ({ default: module.ThemeBasicsPreview }))),
  'async-basics': lazy(() => import('./AsyncBasicsPreview').then((module) => ({ default: module.AsyncBasicsPreview }))),
  'future-builder': lazy(() => import('./FutureBuilderPreview').then((module) => ({ default: module.FutureBuilderPreview }))),

  // Section 12
  'inherited-widget': lazy(() =>
    import('./InheritedWidgetPreview').then((module) => ({ default: module.InheritedWidgetPreview }))
  ),
  'provider-basics': lazy(() =>
    import('./ProviderBasicsPreview').then((module) => ({ default: module.ProviderBasicsPreview }))
  ),
  'value-notifier': lazy(() =>
    import('./ValueNotifierPreview').then((module) => ({ default: module.ValueNotifierPreview }))
  ),

  // Section 13
  'null-safety': lazy(() => import('./NullSafetyPreview').then((module) => ({ default: module.NullSafetyPreview }))),
  'streams-basics': lazy(() => import('./StreamsPreview').then((module) => ({ default: module.StreamsPreview }))),
  'dart-mixins': lazy(() => import('./DartMixinsPreview').then((module) => ({ default: module.DartMixinsPreview }))),

  // Section 14
  'animated-container': lazy(() =>
    import('./AnimatedContainerPreview').then((module) => ({ default: module.AnimatedContainerPreview }))
  ),
  'animation-controller': lazy(() =>
    import('./AnimationControllerPreview').then((module) => ({ default: module.AnimationControllerPreview }))
  ),
  'hero-animation': lazy(() =>
    import('./HeroAnimationPreview').then((module) => ({ default: module.HeroAnimationPreview }))
  ),

  // Section 15
  'json-serialization': lazy(() =>
    import('./JsonSerializationPreview').then((module) => ({ default: module.JsonSerializationPreview }))
  ),
  'http-basics': lazy(() => import('./HttpBasicsPreview').then((module) => ({ default: module.HttpBasicsPreview }))),
  'shared-preferences': lazy(() =>
    import('./SharedPreferencesPreview').then((module) => ({ default: module.SharedPreferencesPreview }))
  ),

  // Section 16
  'widget-testing': lazy(() =>
    import('./WidgetTestingPreview').then((module) => ({ default: module.WidgetTestingPreview }))
  ),
  'unit-testing': lazy(() => import('./UnitTestingPreview').then((module) => ({ default: module.UnitTestingPreview }))),
  'flutter-inspector': lazy(() =>
    import('./FlutterInspectorPreview').then((module) => ({ default: module.FlutterInspectorPreview }))
  ),
};

const theoryLessons = new Set([
  'what-is-flutter',
  'what-is-dart',
  'app-structure',
  'hot-reload',
  'colors-styling',
  'reusable-widgets',
]);

function PreviewFallback({ label }: { label: string }) {
  return (
    <div className="p-8 text-center bg-gray-50 border border-dashed rounded-xl text-gray-500">
      {label}
    </div>
  );
}

export function PreviewRegistry({ lessonId }: { lessonId: string }) {
  const { t } = useLanguage();

  if (theoryLessons.has(lessonId)) {
    return <PreviewFallback label={t('theoryLesson')} />;
  }

  const PreviewComponent = previewMap[lessonId];

  if (!PreviewComponent) {
    return <PreviewFallback label={t('comingSoon')} />;
  }

  return (
    <Suspense fallback={<PreviewFallback label={t('loadingPreview')} />}>
      <PreviewComponent />
    </Suspense>
  );
}
