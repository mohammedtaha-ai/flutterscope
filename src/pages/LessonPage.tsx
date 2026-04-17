import React, { useDeferredValue, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCourseData, getLessonById } from '@/src/data/lessons';
import { PreviewRegistry } from '@/src/components/previews/PreviewRegistry';
import { Quiz } from '@/src/components/Quiz';
import { MonitorSmartphone, Menu, ChevronRight, ChevronLeft, Home, ArrowLeft, ArrowRight, CheckCircle2, Clock, Info, Target, Search, X } from 'lucide-react';
import { useLanguage } from '@/src/i18n/LanguageContext';
import { LanguageSwitcher } from '@/src/i18n/LanguageSwitcher';

export function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const courseData = getCourseData(lang);
  const lessonData = id ? getLessonById(id, lang) : null;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarVisible, setDesktopSidebarVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    const stored = window.localStorage.getItem('flutterscope_sidebar_visible');
    return stored === null ? true : stored === 'true';
  });
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery.trim().toLowerCase());

  useEffect(() => {
    const stored = localStorage.getItem('flutterscope_completed');
    if (stored) {
      try {
        setCompletedLessons(JSON.parse(stored));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('flutterscope_sidebar_visible', String(desktopSidebarVisible));
  }, [desktopSidebarVisible]);

  const markCompleted = (lessonId: string) => {
    setCompletedLessons(prev => {
      if (prev.includes(lessonId)) return prev;
      const next = [...prev, lessonId];
      localStorage.setItem('flutterscope_completed', JSON.stringify(next));
      return next;
    });
  };

  if (!lessonData) {
    return (
      <div className="p-20 text-center">
        {t('lessonNotFound')}
        <Link to="/" className="text-blue-500 block mt-4">
          {t('goHome')}
        </Link>
      </div>
    );
  }

  const { lesson, section } = lessonData;

  const filteredCourseData = courseData
    .map((currentSection) => {
      if (!deferredSearchQuery) {
        return currentSection;
      }

      const sectionMatches = `${currentSection.title} ${currentSection.description}`.toLowerCase().includes(deferredSearchQuery);
      const lessons = sectionMatches
        ? currentSection.lessons
        : currentSection.lessons.filter((currentLesson) =>
            `${currentLesson.title} ${currentLesson.description}`.toLowerCase().includes(deferredSearchQuery)
          );

      return lessons.length > 0 ? { ...currentSection, lessons } : null;
    })
    .filter((currentSection): currentSection is typeof courseData[number] => currentSection !== null);

  const getSectionProgress = (lessonIds: string[]) => {
    const completedCount = lessonIds.filter((lessonId) => completedLessons.includes(lessonId)).length;
    const totalCount = lessonIds.length;
    const percent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

    return { completedCount, totalCount, percent };
  };

  // Determine prev/next lesson intelligently across sections
  let prevLessonId: string | null = null;
  let nextLessonId: string | null = null;

  let flatLessons: { id: string }[] = [];
  courseData.forEach(s => {
    s.lessons.forEach(l => flatLessons.push(l));
  });

  const flatIndex = flatLessons.findIndex(l => l.id === lesson.id);
  if (flatIndex > 0) prevLessonId = flatLessons[flatIndex - 1].id;
  if (flatIndex < flatLessons.length - 1) nextLessonId = flatLessons[flatIndex + 1].id;

  const currentSectionProgress = getSectionProgress(section.lessons.map((currentLesson) => currentLesson.id));

  const RTLChevronRight = lang === 'ar' ? ChevronLeft : ChevronRight;
  const RTLChevronLeft = lang === 'ar' ? ChevronRight : ChevronLeft;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden text-slate-900">
      
      {/* Mobile Sidebar Backdrip */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative top-0 bottom-0 ${lang === 'ar' ? 'right-0' : 'left-0'} z-50 w-72 bg-white transform transition-all duration-300 ease-in-out flex flex-col shrink-0
        ${sidebarOpen ? 'translate-x-0' : (lang === 'ar' ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0')}
        ${desktopSidebarVisible
          ? `lg:w-72 lg:min-w-72 lg:opacity-100 lg:pointer-events-auto ${lang === 'ar' ? 'lg:border-l' : 'lg:border-r'}`
          : `lg:w-0 lg:min-w-0 lg:opacity-0 lg:pointer-events-none lg:border-0 ${lang === 'ar' ? 'lg:translate-x-full' : 'lg:-translate-x-full'}`}
        ${lang === 'ar' ? 'border-l' : 'border-r'}
      `}>
        <div className="p-5 border-b flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-100 p-1.5 rounded-lg group-hover:bg-blue-500 transition-colors">
              <MonitorSmartphone className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <span className="font-bold whitespace-nowrap">FlutterScope</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-gray-500 hover:bg-gray-100 rounded">
            {lang === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          <div className="px-1">
            <div className="relative">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 ${lang === 'ar' ? 'right-4' : 'left-4'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={t('searchLessonsPlaceholder')}
                className={`w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 ${lang === 'ar' ? 'pr-10 pl-10 text-right' : 'pl-10 pr-10'}`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className={`absolute top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 ${lang === 'ar' ? 'left-2' : 'right-2'}`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {filteredCourseData.length > 0 ? filteredCourseData.map((sec) => {
            const sectionProgress = getSectionProgress(sec.lessons.map((currentLesson) => currentLesson.id));

            return (
            <div key={sec.id}>
              <div className="mb-3 px-3">
                <h3 className="uppercase text-xs font-bold text-gray-400 tracking-wider">{sec.title}</h3>
                <div className="mt-2 flex items-center justify-between gap-3 text-[11px] font-semibold text-gray-500">
                  <span>{t('sectionProgressLabel')}</span>
                  <span>{sectionProgress.completedCount}/{sectionProgress.totalCount}</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-gray-100 overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                  <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${sectionProgress.percent}%` }} />
                </div>
              </div>
              <div className="space-y-1">
                {sec.lessons.map(l => {
                  const isActive = l.id === lesson.id;
                  const isCompleted = completedLessons.includes(l.id);
                  return (
                    <Link
                      key={l.id}
                      to={`/lesson/${l.id}`}
                      onClick={() => setSidebarOpen(false)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between ${isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <span className={`truncate ${lang === 'ar' ? 'pl-2' : 'pr-2'}`}>{l.title}</span>
                      {isCompleted && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                    </Link>
                  );
                })}
              </div>
            </div>
            );
          }) : (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-center text-sm text-gray-500">
              {t('noLessonsFound')}
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white border-b flex items-center px-3 lg:px-6 xl:px-8 justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex text-sm text-gray-500 items-center gap-2">
              <span className="font-medium">{section.title}</span>
              <RTLChevronRight className="w-4 h-4 opacity-50" />
              <span className="text-gray-900 font-medium">{lesson.title}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden xl:block min-w-[180px]">
              <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-gray-500">
                <span>{t('sectionProgressLabel')}</span>
                <span>{currentSectionProgress.completedCount}/{currentSectionProgress.totalCount}</span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${currentSectionProgress.percent}%` }} />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDesktopSidebarVisible((current) => !current)}
              className="hidden lg:flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              {desktopSidebarVisible ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span>{desktopSidebarVisible ? t('hideSidebar') : t('showSidebar')}</span>
            </button>
            <LanguageSwitcher />
            <div className="flex items-center gap-2">
              <button 
                onClick={() => prevLessonId && navigate(`/lesson/${prevLessonId}`)}
                disabled={!prevLessonId}
                className="p-2 border rounded-lg text-gray-600 disabled:opacity-30 disabled:bg-gray-50 hover:bg-gray-50 transition"
                title={t('previousLesson')}
              >
                <RTLChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => nextLessonId && navigate(`/lesson/${nextLessonId}`)}
                disabled={!nextLessonId}
                className="p-2 border rounded-lg text-gray-600 disabled:opacity-30 disabled:bg-gray-50 hover:bg-gray-50 transition"
                title={t('nextLesson')}
              >
                <RTLChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Document */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1480px] px-4 py-6 lg:px-6 lg:py-8 xl:px-8 space-y-8 xl:space-y-10">
            
            {/* Context/Theory */}
            <section className="max-w-4xl">
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-3">
                <Clock className="w-4 h-4" />
                <span>~{lesson.durationMinutes || Math.max(1, Math.ceil(lesson.description.split(' ').length / 200))} {t('minRead')}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">{lesson.title}</h1>
              
              {lesson.objectives && lesson.objectives.length > 0 && (
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 mb-8">
                  <h3 className="font-bold text-blue-900 flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-blue-500" />
                    {t('whatYouWillLearn')}
                  </h3>
                  <ul className="space-y-2">
                    {lesson.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-blue-800 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-8 block">
                {lesson.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-lg text-gray-600 leading-relaxed mb-6">
                    {paragraph.split(/(\*\*.*?\*\*|`.*?`)/g).map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
                      }
                      if (part.startsWith('`') && part.endsWith('`')) {
                        return (
                          <code key={i} className={`bg-gray-100 border border-gray-200 text-pink-600 px-1.5 py-0.5 rounded-md font-mono text-sm mx-0.5`} dir="ltr">
                            {part.slice(1, -1)}
                          </code>
                        );
                      }
                      return part;
                    })}
                  </p>
                ))}
              </div>

              {lesson.callout && (
                <div className={`bg-amber-50 border-amber-400 p-5 ${lang === 'ar' ? 'border-r-4 rounded-l-xl' : 'border-l-4 rounded-r-xl'} mb-8 flex gap-3 text-amber-900`}>
                  <Info className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium leading-relaxed">{lesson.callout}</p>
                </div>
              )}
            </section>

            {/* Interactive Preview Engine */}
            <section className="w-full">
              <PreviewRegistry lessonId={lesson.id} />
            </section>

            {/* Mini Quiz */}
            {lesson.quiz.length > 0 && (
              <section className="pt-10 border-t max-w-4xl">
                <Quiz 
                  questions={lesson.quiz} 
                  onComplete={() => markCompleted(lesson.id)}
                  onNextLesson={() => {
                    if (nextLessonId) navigate(`/lesson/${nextLessonId}`);
                  }}
                  hasNextLesson={!!nextLessonId}
                />
              </section>
            )}

            {/* Bottom Nav */}
            <section className="pt-10 flex justify-between items-center pb-16 max-w-4xl">
              {prevLessonId ? (
                <Link to={`/lesson/${prevLessonId}`} className="flex items-center gap-2 text-blue-600 font-medium hover:underline">
                  <RTLChevronLeft className="w-4 h-4" /> {t('previousLesson')}
                </Link>
              ) : <div />}
              
              {nextLessonId ? (
                <button 
                  onClick={() => {
                    markCompleted(lesson.id);
                    navigate(`/lesson/${nextLessonId}`);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-md transition-colors"
                >
                  {t('nextLesson')} <RTLChevronRight className="w-4 h-4 shrink-0" />
                </button>
              ) : (
                <Link 
                  to="/" 
                  onClick={() => markCompleted(lesson.id)}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                  <Home className="w-4 h-4" /> {t('finishCourse')}
                </Link>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
