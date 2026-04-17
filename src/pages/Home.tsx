import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Lightbulb, MonitorSmartphone, Code2, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { getCourseData, getFirstLessonId } from '@/src/data/lessons';
import { motion } from 'motion/react';
import { useLanguage } from '@/src/i18n/LanguageContext';
import { LanguageSwitcher } from '@/src/i18n/LanguageSwitcher';

export function Home() {
  const { lang, t } = useLanguage();
  const courseData = getCourseData(lang);
  const firstLessonId = getFirstLessonId();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  
  useEffect(() => {
    const stored = localStorage.getItem('flutterscope_completed');
    if (stored) {
      try {
        setCompletedLessons(JSON.parse(stored));
      } catch(e) {}
    }
  }, []);

  const totalLessons = courseData.reduce((acc, section) => acc + section.lessons.length, 0);
  const progressPercent = Math.round((completedLessons.length / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 flex flex-col">
      <header className="bg-white border-b py-5 px-6 lg:px-12 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <MonitorSmartphone className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            FlutterScope
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link 
            to={`/lesson/${firstLessonId}`}
            className="hidden sm:flex px-5 py-2.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition items-center gap-2 shadow-md shadow-blue-500/20"
          >
            {t('startLearning')} {lang === 'en' ? <ArrowRight className="w-4 h-4" /> : null}
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 flex flex-wrap justify-center gap-2"
          >
            <span className="text-blue-600">FlutterScope</span>
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold text-slate-800 mb-6"
          >
            {t('learnFlutterVisually')}
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg md:text-xl text-slate-600 mb-10"
          >
            {t('heroDesc')}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              to={`/lesson/${firstLessonId}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-blue-600 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
            >
              <Play className={`w-5 h-5 fill-white ${lang === 'ar' ? 'rotate-180' : ''}`} />
              {t('launchCourse')}
            </Link>
          </motion.div>
        </section>

        {/* Features / Modules */}
        <section className="grid md:grid-cols-3 gap-6 lg:gap-10 mb-20 px-4">
          <FeatureCard 
            icon={Layers} 
            title={t('widgetBasics')} 
            desc={t('widgetBasicsDesc')} 
            color="bg-blue-100 text-blue-600"
          />
          <FeatureCard 
            icon={MonitorSmartphone} 
            title={t('flexLayouts')} 
            desc={t('flexLayoutsDesc')} 
            color="bg-purple-100 text-purple-600"
          />
          <FeatureCard 
            icon={Code2} 
            title={t('interactiveState')} 
            desc={t('interactiveStateDesc')} 
            color="bg-emerald-100 text-emerald-600"
          />
        </section>

        {/* Course Outline Preview */}
        <section className="max-w-4xl mx-auto w-full bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
           <div className={`absolute top-0 opacity-5 pointer-events-none ${lang === 'ar' ? 'left-0 p-12' : 'right-0 p-12'}`}>
             <Layers className="w-64 h-64" />
           </div>
           
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
             <h3 className="text-2xl font-bold flex items-center gap-3">
              <Lightbulb className="text-amber-500 w-6 h-6" /> 
              {t('curriculumStr')}
             </h3>
             <div className={lang === 'ar' ? 'text-left' : 'text-right'}>
               <div className="text-sm font-semibold text-gray-500 mb-1">{completedLessons.length} {t('lessonsCompleted')} {totalLessons} {t('lessonsCompletedSuffix')}</div>
               <div className="w-full sm:w-48 h-2 bg-gray-100 rounded-full overflow-hidden flex" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                 <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
               </div>
             </div>
           </div>
           
           <div className="space-y-8 relative z-10">
             {courseData.map((section, idx) => (
               <div key={section.id} className={`relative pb-2 border-gray-100 ${lang === 'ar' ? 'pr-6 border-r-2' : 'pl-6 border-l-2'}`}>
                 <div className={`absolute top-1 w-4 h-4 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center ${lang === 'ar' ? '-right-[9px]' : '-left-[9px]'}`}>
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                 </div>
                 <h4 className="font-bold text-lg text-gray-900 mb-1">{section.title}</h4>
                 <p className="text-gray-500 text-sm mb-4">{section.description}</p>
                 <div className="flex flex-wrap gap-2">
                   {section.lessons.map(lesson => {
                     const isCompleted = completedLessons.includes(lesson.id);
                     return (
                       <Link 
                          key={lesson.id} 
                          to={`/lesson/${lesson.id}`}
                          className={`px-3 py-1.5 flex items-center gap-1.5 text-sm font-medium rounded-lg border transition-colors ${
                            isCompleted ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200'
                          }`}
                       >
                         {lesson.title}
                         {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                       </Link>
                     );
                   })}
                 </div>
               </div>
             ))}
           </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, color }: any) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${color}`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}
