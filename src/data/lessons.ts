export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface LessonContent {
  id: string;
  title: string;
  description: string;
  quiz: QuizQuestion[];
  callout?: string;
  objectives?: string[];
  durationMinutes?: number;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  lessons: LessonContent[];
}

export const courseDataEn: Section[] = [
  {
    id: "getting-started",
    title: "1. Getting Started",
    description: "Welcome to Flutter! Start from absolute ground zero and learn the core concepts.",
    lessons: [
      {
        id: "what-is-flutter",
        title: "What is Flutter?",
        description: "Flutter is a free, open-source toolkit created by Google. It allows you to build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.\n\nInstead of writing separate code for iOS and Android, you write it **once** in Flutter! Think of it like a game engine, but for application interfaces.",
        callout: "Common Mistake: Thinking Flutter uses native UI elements behind the scenes. Actually, Flutter paints every pixel to the screen itself using a high-performance graphics engine!",
        objectives: ["Understand what Flutter solves", "Learn the 'write once, run everywhere' philosophy"],
        durationMinutes: 2,
        quiz: [
          {
            question: "What is the main benefit of Flutter?",
            options: [
              "It only builds iOS apps",
              "You write code once and it runs everywhere",
              "It is a database system",
              "It is an operating system"
            ],
            correctAnswerIndex: 1,
            explanation: "Flutter is a UI toolkit that lets you build apps for multiple platforms from a single codebase."
          }
        ]
      },
      {
        id: "what-is-dart",
        title: "What is Dart?",
        description: "**Dart** is the programming language you use to write Flutter apps.\n\nDesigned to be easy to learn for anyone with basic programming experience, Dart powers Flutter's incredibly fast performance and super-smooth 60fps animations. It looks a lot like `JavaScript`, `Java`, or `C#`.",
        callout: "Did you know? Dart can compile ahead-of-time (AOT) to machine code for fast performance, and just-in-time (JIT) for the magical Hot Reload feature during development.",
        objectives: ["Identify the programming language used for Flutter", "Understand why Dart is beneficial"],
        durationMinutes: 2,
        quiz: [
          {
            question: "Which programming language is used to build Flutter apps?",
            options: ["Java", "Swift", "Dart", "Python"],
            correctAnswerIndex: 2,
            explanation: "Flutter apps are compiled using the Dart programming language, optimized for fast UIs."
          }
        ]
      },
      {
        id: "app-structure",
        title: "How Flutter Apps are Structured",
        description: "In Flutter, EVERYTHING is a **Widget**. A widget is just a blueprint for a piece of the user interface. Your app itself is a widget!\n\nYou build UIs by putting widgets inside other widgets, conceptually forming a massive tree-like structure.",
        callout: "Analogy time: Think of widgets like LEGO bricks. You combine small, simple bricks (widgets) together to build much larger, complex creations.",
        objectives: ["Understand the concept of a Widget", "Visualize UI as a tree of widgets"],
        quiz: [
          {
            question: "In Flutter, what term is used to describe the building blocks of the UI?",
            options: ["Elements", "Components", "Views", "Widgets"],
            correctAnswerIndex: 3,
            explanation: "Everything from a button to the layout itself is a Widget in Flutter."
          }
        ]
      },
      {
        id: "main-runapp",
        title: "main() and runApp()",
        description: "Every Dart program starts at a function called `main()`.\n\nIn Flutter, inside `main()`, we call `runApp()`, which takes our main app widget and attaches it to the screen.",
        callout: "Common Mistake: Forgetting to place runApp() inside main() means your app will start, but absolutely nothing makes it onto the screen!",
        objectives: ["Learn the entry point of a Flutter app", "Understand how to command the screen to start painting"],
        durationMinutes: 3,
        quiz: [
          {
            question: "Which function tells Flutter to start drawing your main widget to the screen?",
            options: ["startApp()", "runApp()", "initApp()", "build()"],
            correctAnswerIndex: 1,
            explanation: "runApp() is called inside main() to inflate your widget and attach it to the screen."
          }
        ]
      },
      {
        id: "materialapp-scaffold",
        title: "MaterialApp & Scaffold",
        description: "`MaterialApp` is the outer wrapper of your app that sets up routing and themes.\n\n`Scaffold` provides the standard visual structure for a specific screen, giving you predefined slots to easily drop in an `appBar`, a `floatingActionButton`, and the main `body`.",
        callout: "MaterialApp is typically used only ONCE at the very root of your app. Scaffold is used once for EVERY distinct screen you navigate to.",
        objectives: ["Differentiate between MaterialApp and Scaffold", "Understand what Scaffold does for a screen"],
        quiz: [
          {
            question: "Which widget is responsible for setting up the basic visual layout structure of a screen (like adding an AppBar)?",
            options: ["MaterialApp", "Container", "Scaffold", "Body"],
            correctAnswerIndex: 2,
            explanation: "Scaffold implements the basic material design visual layout structure."
          }
        ]
      },
      {
        id: "hot-reload",
        title: "The Magic of Hot Reload",
        description: "One of Flutter's best features is **Hot Reload**.\n\nWhen you save your code, Flutter injects the updated source code directly into the running app instantly. The UI updates within milliseconds without losing your current application state!",
        callout: "Analogy time: Hot Reload is like swapping the engine out of an airplane while it's still flying, without anyone inside noticing.",
        objectives: ["Understand how Hot Reload enhances development speed"],
        quiz: [
          {
            question: "What does Hot Reload do?",
            options: [
              "Restarts the entire emulator",
              "Deletes the app and reinstalls it",
              "Instantly updates the UI while keeping the app running",
              "Compiles the app for iOS"
            ],
            correctAnswerIndex: 2,
            explanation: "Hot reload updates your running app instantly without losing its current state."
          }
        ]
      }
    ]
  },
  {
    id: "first-widgets",
    title: "2. Your First Widgets",
    description: "Meet the essential building blocks you will use every day.",
    lessons: [
      {
        id: "text-widget",
        title: "The Text Widget",
        description: "The `Text` widget is simply how you display text in Flutter. It's highly customizable, allowing you to change fonts, colors, and sizes using the `TextStyle` object.",
        callout: "Common Mistake: Trying to change the text color directly on the Text widget instead of using the inner 'style' property (TextStyle).",
        objectives: ["Learn how to display text on screen", "Apply basic styling to text"],
        quiz: [
          {
            question: "What property allows you to change the font size and color of a Text widget?",
            options: ["style", "decoration", "format", "font"],
            correctAnswerIndex: 0,
            explanation: "The style property takes a TextStyle object, which lets you customize the text appearance."
          }
        ]
      },
      {
        id: "center-widget",
        title: "The Center Widget",
        description: "Often, widgets will default to the top-left corner. The `Center` widget does exactly what it says: it takes whatever child you give it, and aligns it perfectly dead-center within its parent's available boundaries.",
        callout: "Center only expands as large as its parent allows. If a Center widget's parent has zero size, the Center widget will also be zero size!",
        objectives: ["Center single items on screen"],
        quiz: [
          {
            question: "What does the Center widget do?",
            options: [
              "Makes text bold",
              "Centers its child within itself",
              "Creates a new screen",
              "Adds padding around the screen"
            ],
            correctAnswerIndex: 1,
            explanation: "Center aligns its single child perfectly in the middle."
          }
        ]
      },
      {
        id: "container",
        title: "The Container & Padding",
        description: "`Container` is the ultimate multi-purpose widget. You use it for painting backgrounds, sizing elements, and positioning child widgets.\n\n`Padding` is a property of `Container` used to create space inside, pushing the child inward.",
        callout: "If you only need padding without decoration (like a background color or border), prefer using the dedicated 'Padding' widget instead of a 'Container' for better performance.",
        objectives: ["Use Container to draw boxes", "Apply padding internally"],
        quiz: [
          {
            question: "What does the padding property in a Container do?",
            options: [
              "Changes the background color",
              "Adds space inside the container, around its child",
              "Adds space outside the container",
              "Changes the width of the container"
            ],
            correctAnswerIndex: 1,
            explanation: "Padding pushes the child widget inward, creating space between the container's edges and the child."
          }
        ]
      },
      {
        id: "sizedbox",
        title: "The SizedBox Widget",
        description: "While Container is heavy and feature-rich, `SizedBox` is lightweight.\n\nUse `SizedBox` when you just want to force a specific width and height, or when you just want to add some empty space between two widgets.",
        objectives: ["Add spacing between widgets", "Force a widget to be a specific size"],
        quiz: [
          {
            question: "When should you prefer SizedBox over Container?",
            options: [
              "When you need a background color",
              "When you just need an invisible box with a specific width/height",
              "When you need to add borders",
              "When you want to center an item"
            ],
            correctAnswerIndex: 1,
            explanation: "SizedBox is specifically designed to assign simple dimensions or empty space without the overhead of Container."
          }
        ]
      }
    ]
  },
  {
    id: "layout",
    title: "3. Layout Basics",
    description: "Learn how to arrange multiple widgets on the screen.",
    lessons: [
      {
        id: "row-column",
        title: "Row and Column",
        description: "`Row` and `Column` are the most important layout widgets.\n\n`Row` arranges its children side-by-side horizontally. `Column` arranges its children vertically from top to bottom.",
        callout: "Common Mistake: Nesting a Column inside a Column, or a Row inside a Row, without using Expanded causing 'infinite height' errors.",
        objectives: ["Stack items vertically and horizontally", "Use CrossAxisAlignment and MainAxisAlignment"],
        quiz: [
          {
            question: "Which widget is used to arrange items vertically?",
            options: ["Row", "Stack", "Column", "Align"],
            correctAnswerIndex: 2,
            explanation: "A Column arranges its children in a vertical array."
          },
          {
            question: "In a Column, what does MainAxisAlignment control?",
            options: [
              "Horizontal alignment",
              "Vertical distribution of space",
              "The size of the children",
              "The background color"
            ],
            correctAnswerIndex: 1,
            explanation: "For a Column, the main axis is vertical, so MainAxisAlignment spaces children vertically."
          }
        ]
      },
      {
        id: "expanded-flexible",
        title: "Expanded and Flexible",
        description: "When using Rows and Columns, sometimes you want a child to stretch out and fill all the remaining free space.\n\n`Expanded` does exactly this—forcing the child to grow. `Flexible` is similar, but allows the child to be smaller than the available space if needed.",
        callout: "Expanded must ALWAYS be a direct descendant of a Row, Column, or Flex widget. Using it anywhere else will break your UI.",
        objectives: ["Make widgets consume remaining free space dynamically"],
        quiz: [
          {
            question: "What does the Expanded widget do inside a Row?",
            options: [
              "Expands the child to fill available horizontal empty space",
              "Expands the text font size to maximum",
              "Adds padding around the Row",
              "Makes the child float at the bottom"
            ],
            correctAnswerIndex: 0,
            explanation: "Expanded forces its child to claim out any remaining empty space along the main axis."
          }
        ]
      },
      {
        id: "stack",
        title: "Stack (Layering)",
        description: "The `Stack` widget allows you to place widgets on top of each other.\n\nThe first child in the Stack is the bottom-most layer, and subsequent children are sequentially layered on top from back to front.",
        objectives: ["Overlay multiple widgets on top of one another"],
        quiz: [
          {
            question: "How does the Stack widget arrange its children?",
            options: [
              "Side by side",
              "One above the other vertically",
              "Layered on top of each other (Z-axis)",
              "In a grid formation"
            ],
            correctAnswerIndex: 2,
            explanation: "Stack layers widgets on the Z-axis, with the first widget at the bottom."
          }
        ]
      }
    ]
  },
  {
    id: "ui-structure",
    title: "4. UI Structure",
    description: "Deep dive into composing real-world application screens.",
    lessons: [
      {
        id: "scaffold-deep",
        title: "Composing the Scaffold",
        description: "A `Scaffold` does more than provide a white background.\n\nIt manages complex screen parts for you automatically: the `AppBar` at the top, the main `body`, and any `floatingActionButton`.",
        callout: "The Body of a scaffold automatically avoids the AppBar! You don't have to manually calculate spacing to avoid drawing behind the top bar.",
        objectives: ["Assemble a complete native-looking screen with headers and buttons"],
        quiz: [
          {
            question: "Which Scaffold property holds the main content of the screen?",
            options: ["appBar", "main", "content", "body"],
            correctAnswerIndex: 3,
            explanation: "The 'body' property represents the primary content of the Scaffold."
          }
        ]
      },
      {
        id: "button-interactions",
        title: "Buttons & Interactivity",
        description: "Flutter has many built-in buttons: `ElevatedButton`, `TextButton`, and `IconButton`.\n\nEvery button typically takes an `onPressed` function that tells the application what to do when the user taps it.",
        callout: "Common Mistake: Passing the result of a function to onPressed (e.g. onPressed: doThing()), instead of passing the function itself (e.g. onPressed: doThing).",
        objectives: ["Create interactive clickable buttons", "Differentiate between button styles"],
        quiz: [
          {
            question: "Which property makes a Flutter button execute code when clicked?",
            options: ["onClick", "onTap", "onPressed", "action"],
            correctAnswerIndex: 2,
            explanation: "Flutter core buttons use the 'onPressed' constructor argument."
          }
        ]
      }
    ]
  },
  {
    id: "state",
    title: "5. Stateless vs Stateful",
    description: "Make your apps interactive by understanding State.",
    lessons: [
      {
        id: "stateless-stateful",
        title: "Stateless vs Stateful",
        description: "A `StatelessWidget` is fundamentally immutable—once drawn, it cannot change its own visual properties.\n\nA `StatefulWidget` holds data ('state') that can dynamically change over time. If your widget needs to react to user input visually, it must be **Stateful**.",
        objectives: ["Understand the difference between static and dynamic widgets"],
        quiz: [
          {
            question: "If your widget has a checkbox that needs to toggle visually, what kind of widget should it be?",
            options: ["StatelessWidget", "StatefulWidget", "InteractiveWidget", "ContainerWidget"],
            correctAnswerIndex: 1,
            explanation: "Because the visual state changes (checked vs unchecked), it requires a StatefulWidget."
          }
        ]
      },
      {
        id: "counter",
        title: "setState() & The Counter",
        description: "Inside a StatefulWidget, you cannot just change a variable to natively update the screen.\n\nYou must wrap the data change in the `setState()` function! This magical function tells Flutter 'Hey, I changed some data, please queue a redraw of the UI!'",
        callout: "Analogy time: Calling setState is like pressing the refresh button on a web browser after you've updated the database.",
        objectives: ["Trigger UI updates using setState"],
        quiz: [
          {
            question: "What function must be called to tell Flutter to redraw a StatefulWidget?",
            options: ["redraw()", "updateUI()", "setState()", "build()"],
            correctAnswerIndex: 2,
            explanation: "setState() causes the framework to schedule a build to reflect the new state."
          }
        ]
      }
    ]
  },
  {
    id: "next-steps",
    title: "6. Navigation",
    description: "Move across multiple screens seamlessly.",
    lessons: [
      {
        id: "navigation-concept",
        title: "Basic Navigation",
        description: "Moving between screens in Flutter usually involves the `Navigator`.\n\nYou can use `Navigator.push()` to put a new screen on top of the old one, and `Navigator.pop()` to destroy the current screen and go back.",
        callout: "The Navigator manages a Stack of routes. Pushing adds to the top of the stack, Popping removes the top element.",
        objectives: ["Transition to entirely new screens dynamically", "Return safely to the previous screen"],
        quiz: [
          {
            question: "How do you navigate explicitly to a new screen adding it to the stack?",
            options: ["Navigator.go()", "Navigator.push()", "Screen.next()", "App.change()"],
            correctAnswerIndex: 1,
            explanation: "Navigator.push() places a new route (screen) onto the navigator stack."
          }
        ]
      }
    ]
  },
  {
    id: "lists",
    title: "7. Lists & Input",
    description: "Display scalable data and listen to users.",
    lessons: [
      {
        id: "list-view",
        title: "ListView",
        description: "When you have too many items to fit vertically inside a Column, your app will show a yellow-and-black error boundary.\n\nThe solution is `ListView`! A ListView is a scrollable list widget perfect for repeated or dynamic string content.",
        objectives: ["Implement scalable, scrollable content containers safely"],
        quiz: [
          {
            question: "Why should you use a ListView instead of a Column for numerous items?",
            options: ["ListView automatically scrolls", "ListView has background colors", "A Column cannot hold Text widgets", "ListView is automatically a Row"],
            correctAnswerIndex: 0,
            explanation: "ListView automatically provides scrolling behavior when content exceeds screen bounds."
          }
        ]
      },
      {
        id: "text-field",
        title: "TextField & Input",
        description: "`TextField` is the standard way to accept physical keyboard input from users.\n\nTo retrieve the letters typed into a TextField by the user, we bind a tool called a `TextEditingController` directly to it.",
        callout: "Always remember to dispose() of your TextEditingController when the screen is destroyed to prevent terrible memory leaks!",
        objectives: ["Accept keyboard input from a user", "Read the value cleanly out of a form field"],
        quiz: [
          {
            question: "Which object is used to read the current text inside a TextField?",
            options: ["InputManager", "TextReader", "TextEditingController", "StateController"],
            correctAnswerIndex: 2,
            explanation: "A TextEditingController can be attached to a TextField to read or modify the current input value."
          }
        ]
      }
    ]
  }
];

export const courseDataAr: Section[] = [
  {
    id: "getting-started",
    title: "١. البداية",
    description: "مرحبًا بك في فلاتر! ابدأ من الصفر وتعلم المفاهيم الأساسية.",
    lessons: [
      {
        id: "what-is-flutter",
        title: "ما هو فلاتر؟",
        description: "فلاتر عبارة عن مجموعة أدوات مجانية مفتوحة المصدر أنشأتها Google. تتيح لك بناء تطبيقات مجمعة محليًا وجميلة للهواتف المحمولة والويب وسطح المكتب من قاعدة كود واحدة.\n\nبدلاً من كتابة كود منفصل لـ iOS و Android، تكتبه **مرة واحدة** في فلاتر! فكر في الأمر كمحرك ألعاب، ولكن لواجهات التطبيقات.",
        callout: "خطأ شائع: الاعتقاد بأن فلاتر يستخدم عناصر واجهة أصلية في الخلفية. في الواقع، تقوم فلاتر برسم كل بكسل على الشاشة بنفسها باستخدام محرك رسومات عالي الأداء!",
        objectives: ["فهم ما يحله فلاتر", "تعلم فلسفة 'اكتب مرة واحدة، شغل في كل مكان'"],
        durationMinutes: 2,
        quiz: [
          {
            question: "ما هي الفائدة الرئيسية من فلاتر؟",
            options: [
              "يبني تطبيقات iOS فقط",
              "تكتب الكود مرة واحدة ويعمل في كل مكان",
              "إنه نظام قاعدة بيانات",
              "إنه نظام تشغيل"
            ],
            correctAnswerIndex: 1,
            explanation: "فلاتر هي مجموعة أدوات لإنشاء واجهة للمستخدم تتيح لك بناء تطبيقات لمنصات متعددة من كود واحد."
          }
        ]
      },
      {
        id: "what-is-dart",
        title: "ما هي دارت؟",
        description: "**دارت** هي لغة البرمجة التي تستخدمها لكتابة تطبيقات فلاتر.\n\nصُممت لتكون سهلة التعلم لأي شخص لديه خبرة أساسية في البرمجة، وتدعم دارت أداء فلاتر السريع بشكل لا يصدق والرسوم المتحركة فائقة السلاسة. تبدو كثيراً للغة `JavaScript` أو `Java` أو `C#`.",
        callout: "هل تعلم؟ يمكن لـ دارت التحويل البرمجي مسبقاً (AOT) إلى كود الآلة لأداء سريع، وفي الوقت المناسب (JIT) لميزة إعادة التحميل السريع (Hot Reload) أثناء التطوير.",
        objectives: ["تحديد لغة البرمجة المستخدمة لفلاتر", "فهم سبب فائدة دارت"],
        durationMinutes: 2,
        quiz: [
          {
            question: "ما هي لغة البرمجة المستخدمة لبناء تطبيقات فلاتر؟",
            options: ["Java", "Swift", "Dart", "Python"],
            correctAnswerIndex: 2,
            explanation: "يتم تجميع تطبيقات فلاتر باستخدام لغة دارت، المحسّنة لواجهات المستخدم السريعة."
          }
        ]
      },
      {
        id: "app-structure",
        title: "كيف تتكون تطبيقات فلاتر",
        description: "في فلاتر، كل شيء هو **ويدجت (Widget)**. الويدجت هو مجرد مخطط لجزء من واجهة المستخدم. تطبيقك نفسه هو ويدجت!\n\nتقوم ببناء واجهات المستخدم عن طريق وضع الويدجت داخل ويدجت أخرى، مما يشكل هيكلًا ضخمًا يشبه الشجرة.",
        callout: "وقت القياس: فكر في الويدجت مثل مكعبات الليغو. تقوم بدمج مكعبات صغيرة (widgets) معًا لبناء إبداعات أكبر وأكثر تعقيدًا.",
        objectives: ["فهم مفهوم الـ Widget", "تصور واجهة المستخدم كشجرة من الـ widgets"],
        quiz: [
          {
            question: "في فلاتر، ما هو المصطلح المستخدم لوصف اللبنات الأساسية لواجهة المستخدم؟",
            options: ["Elements", "Components", "Views", "Widgets"],
            correctAnswerIndex: 3,
            explanation: "كل شيء من الزر إلى التخطيط نفسه هو Widget في فلاتر."
          }
        ]
      },
      {
        id: "main-runapp",
        title: "main() و runApp()",
        description: "يبدأ كل برنامج دارت بدالة (function) تسمى `main()`.\n\nفي فلاتر، بداخل `main()`، نستدعي `runApp()`، والتي تأخذ الـ widget الرئيسي لتطبيقنا وترفقه بالشاشة.",
        callout: "خطأ شائع: نسيان وضع runApp() داخل main() يعني أن تطبيقك سيبدأ، ولكن لن يظهر أي شيء على الشاشة!",
        objectives: ["تعلم نقطة الدخول لتطبيق فلاتر", "فهم كيفية توجيه الشاشة لبدء الرسم"],
        durationMinutes: 3,
        quiz: [
          {
            question: "ما هي الدالة التي تخبر فلاتر ببدء رسم الويدجت الرئيسي على الشاشة؟",
            options: ["startApp()", "runApp()", "initApp()", "build()"],
            correctAnswerIndex: 1,
            explanation: "يتم استدعاء runApp() داخل main() لنفخ الويدجت الخاص بك وإرفاقه بالشاشة."
          }
        ]
      },
      {
        id: "materialapp-scaffold",
        title: "MaterialApp و Scaffold",
        description: "`MaterialApp` هو الغلاف الخارجي لتطبيقك الذي يقوم بإعداد التوجيه والسمات (themes).\n\nبينما يوفر `Scaffold` الهيكل المرئي القياسي لشاشة معينة، ويمنحك شقوقاً محددة مسبقًا لإسقاط `appBar` و `body` رئيسي و `floatingActionButton` بسهولة.",
        callout: "عادة ما يتم استخدام MaterialApp مرة واحدة فقط في الجذر الأساسي لتطبيقك. بينما يُستخدم Scaffold مرة واحدة لكل شاشة مختلفة تنتقل إليها.",
        objectives: ["التفريق بين MaterialApp و Scaffold", "فهم ما يفعله Scaffold للشاشة"],
        quiz: [
          {
            question: "ما هو الويدجت المسؤول عن إعداد البنية الأساسية للتخطيط المرئي للشاشة (مثل إضافة AppBar)؟",
            options: ["MaterialApp", "Container", "Scaffold", "Body"],
            correctAnswerIndex: 2,
            explanation: "يطبق Scaffold الهيكل الأساسي المرئي للتصميم (Material Design)."
          }
        ]
      },
      {
        id: "hot-reload",
        title: "سحر الـ Hot Reload",
        description: "واحدة من أفضل ميزات فلاتر هي **Hot Reload** (التحميل السريع).\n\nعند حفظ الكود، يقوم فلاتر بحقن كود المصدر المحدث مباشرة في التطبيق قيد التشغيل فورًا. يتم تحديث واجهة المستخدم في غضون مللي ثانية دون فقدان حالة التطبيق الحالية!",
        callout: "وقت القياس: يشبه Hot Reload تبديل محرك طائرة وهي لا تزال تطير في الهواء، دون أن يلاحظ أي شخص بداخلها.",
        objectives: ["فهم كيف يعزز Hot Reload سرعة التطوير"],
        quiz: [
          {
            question: "ماذا يفعل Hot Reload؟",
            options: [
              "إعادة تشغيل المحاكي بأكمله",
              "يحذف التطبيق ويعيد تثبيته",
              "يحدّث واجهة المستخدم على الفور مع الحفاظ على تشغيل التطبيق",
              "يقوم بتجميع التطبيق لنظام iOS"
            ],
            correctAnswerIndex: 2,
            explanation: "يحدث Hot Reload تطبيقك الجاري تشغيله بسلاسة دون فقدان حالته."
          }
        ]
      }
    ]
  },
  {
    id: "first-widgets",
    title: "٢. الويدجت الأساسية",
    description: "تعرف على اللبنات الأساسية التي ستستخدمها كل يوم.",
    lessons: [
      {
        id: "text-widget",
        title: "ويدجت النص (Text)",
        description: "ويدجت `Text` ببساطة يستخدم لعرض نص في فلاتر. وهو قابل للتخصيص بشكل كبير، مما يسمح لك بتغيير الخطوط والألوان والأحجام باستخدام كائن `TextStyle`.",
        callout: "خطأ شائع: محاولة تغيير لون النص مباشرة على ويدجت Text بدلاً من استخدام خاصية 'style' بداخلها.",
        objectives: ["تعلم كيفية عرض نص على الشاشة", "تطبيق بعض التنسيق الأساسي على النص"],
        quiz: [
          {
            question: "ما الخاصية التي تسمح لك بتغيير حجم الخط ولونه بداخل Text؟",
            options: ["style", "decoration", "format", "font"],
            correctAnswerIndex: 0,
            explanation: "تأخذ خاصية style كائن TextStyle الذي يتيح لك تخصيص مظهر النص."
          }
        ]
      },
      {
        id: "center-widget",
        title: "ويدجت التوسيط (Center)",
        description: "غالبًا، تتمركز العناصر افتراضيًا في الزاوية العلوية اليسرى. ويدجت `Center` يفعل بالضبط ما يقوله: يأخذ أي طفل تضعه داخله، ويقوم بمحاذاته في المركز تمامًا ضمن المساحة المتاحة لوالده.",
        callout: "الـ Center يتوسع فقط بالحجم الذي يسمح به والده. إذا كان حجم الوالد صفراً، فسيكون Center أيضاً بلا حجم!",
        objectives: ["توسيط عنصر واحد على الشاشة"],
        quiz: [
          {
            question: "ماذا يفعل Center؟",
            options: [
              "يجعل النص عريضًا",
              "يُمركز طفله بداخل نفسه",
              "ينشئ شاشة جديدة",
              "يضيف حشوة حول الشاشة"
            ],
            correctAnswerIndex: 1,
            explanation: "Center يحاذي طفله الوحيد في المنتصف تمامًا."
          }
        ]
      },
      {
        id: "container",
        title: "الحاوية (Container) والحشوة",
        description: "`Container` هو ويدجت متعدد الأغراض للغالية. يتم استخدامه لتلوين الخلفيات، وتحديد حجم العناصر، وتحديد المواضع.\n\n`Padding` هي خاصية في الـ `Container` تُستخدم لإحداث مسافة فارغة بداخله، لتدفع المحتوى للداخل.",
        callout: "إذا كنت تحتاج فقط للحشوة (Padding) بدون أي تزويق (مثل خلفية ملونة)، يفضل أن تستخدم الـ Padding بدلاً من Container لأداء أفضل.",
        objectives: ["استخدم Container لرسم الصناديق", "تطبيق الحشوة الداخلية"],
        quiz: [
          {
            question: "ما الذي تفعله خاصية padding داخل العبوة (Container)؟",
            options: [
              "تغير لون الخلفية",
              "تضيف مساحة داخلية حول المحتوى (الطفل)",
              "تضيف مساحة خارجية خارج العبوة",
              "تغير عرض العبوة"
            ],
            correctAnswerIndex: 1,
            explanation: "Padding يدفع الطفل نحو الداخل مفضياً مساحة فارغة بين الأطراف والطفل."
          }
        ]
      },
      {
        id: "sizedbox",
        title: "ويدجت SizedBox",
        description: "بينما يكون الـ Container ثقيلًا ومليئًا بالميزات، يكون الـ `SizedBox` خفيف الوزن.\n\nاستخدم `SizedBox` عندما ترغب في فرض عرض وارتفاع محددين، أو عندما ترغب في إضافة مسافة فارغة بين اثنين من عناصر الـ widgets.",
        objectives: ["إضافة مسافة بين العناصر", "إجبار الويدجت على حجم معين"],
        quiz: [
          {
            question: "متى نفضل استعمال SizedBox بدلاً من Container؟",
            options: [
              "عندما تحتاج للون خلفية",
              "عندما تحتاج ببساطة لمربع غیر مرئي بحجم محدد فقط",
              "عندما تريد إضافة حدود",
              "عندما تريد توسيط عنصر"
            ],
            correctAnswerIndex: 1,
            explanation: "SizedBox مصمم لتعيين أبعاد بسيطة بدون حمل ومزايا Container الثقيلة."
          }
        ]
      }
    ]
  },
  {
    id: "layout",
    title: "٣. أساسيات التخطيط",
    description: "تعرّف على كيفية ترتيب عدة كائنات على الشاشة.",
    lessons: [
      {
        id: "row-column",
        title: "العمود والصف (Row و Column)",
        description: "`Row` و `Column` هما أهم ويدجت للتخطيط.\n\nيقوم `Row` بترتيب أطفاله بشكل أفقي. ويقوم `Column` بترتيبهم بشكل عمودي من أعلى إلى أسفل.",
        callout: "خطأ شائع: إدخال Column كابن لـ Column أو Row داخل Row دون استخدام Expanded، ما يؤدي إلى خطأ الطول اللانهائي.",
        objectives: ["رص العناصر أفقياً وعمودياً", "استخدام MainAxisAlignment"],
        quiz: [
          {
            question: "أي ويدجت يستخدم لترتيب العناصر عمودياً؟",
            options: ["Row", "Stack", "Column", "Align"],
            correctAnswerIndex: 2,
            explanation: "يقوم Column بترتيب أبنائه في مصفوفة عمودية."
          },
          {
            question: "في ويدجت العمود (Column)، ماذا تتحكم MainAxisAlignment؟",
            options: [
              "المحاذاة الأفقية",
              "توزيع المسافات العمودية",
              "حجم الأطفال",
              "لون الخلفية"
            ],
            correctAnswerIndex: 1,
            explanation: "لأن المحور الرئيسي لـ Column هو العمودي، تتحكم MainAxisAlignment في المسافة العمودية."
          }
        ]
      },
      {
        id: "expanded-flexible",
        title: "Expanded و Flexible",
        description: "عند استخدام Row أو Column، أحيانًا تحتاج أن يتمدد الطفل ليستغل كامل المساحة المتبقية.\n\nيقوم `Expanded` بفرض هذا التمدد. وتشبهها `Flexible`، لكنها تسمح للطفل بأن يكون أصغر من المساحة المطلوبة إن لم يحتج لها.",
        callout: "يجب أن يكون Expanded دائماً ابناً مباشراً لـ Row أو Column. استخدامه في مكان آخر سيكسر واجهتك.",
        objectives: ["جعل العناصر تستهلك المساحة المتبقية بشكل ديناميكي"],
        quiz: [
          {
            question: "ماذا تفعل Expanded حين تكون بداخل Row؟",
            options: [
              "تمدد الطفل لملء كامل المساحة الأفقية المتبقية",
              "تكبر الخط كلياً",
              "تضيف Padding للـ Row",
              "تجعل الطفل يطفو بالأسفل"
            ],
            correctAnswerIndex: 0,
            explanation: "Expanded تجبر ابنها على المطالبة بكامل المساحة الخالية على طول المحور الرئيسي."
          }
        ]
      },
      {
        id: "stack",
        title: "المكدس (Stack Layering)",
        description: "يتيح لك ويدجت `Stack` وضع العناصر فوق بعضها البعض على محور Z.\n\nالطفل الأول يكون أبعد طبقة من الأسفل، وكل طفل يليه سيُرص على شكل طبقة فوقه.",
        objectives: ["تداخل عدة طبقات من الويدجت فوق بعضها البعض"],
        quiz: [
          {
            question: "كيف تقوم Stack بترتيب أطفالها؟",
            options: [
              "جنباً إلى جنب",
              "عمودياً فوق بعضهم",
              "في طبقات متداخلة على المحور Z (فوق بعض)",
              "في شكل شبكة"
            ],
            correctAnswerIndex: 2,
            explanation: "Stack يقوم بصنع طبقات، بدءاً من أول طفل يوضع بالأسفل."
          }
        ]
      }
    ]
  },
  {
    id: "ui-structure",
    title: "٤. هيكلة واجهة المستخدم",
    description: "غوص أعمق لتكوين شاشات تطبيق حقيقية ومفصلة.",
    lessons: [
      {
        id: "scaffold-deep",
        title: "تجميع الـ Scaffold",
        description: "لا يوفر `Scaffold` خلفية بيضاء فحسب.\n\nإنه يدير أجزاء الشاشة المعقدة لك تلقائيًا: مثل الـ `AppBar` بالأعلى، والـ `body` الرئيسي، وأيضا الـ `floatingActionButton` بأسفل الشاشة.",
        callout: "الجسم (Body) يتفادى الـ AppBar تلقائياً! لا تحتاج لحساب المسافات يدوياً كي لا تصطدم بالشريط العلوي.",
        objectives: ["تجميع شاشة أصلية المظهر بأشرطة علوية وأزرار"],
        quiz: [
          {
            question: "أي خاصية من خواص Scaffold التي تحوي المحتوى الأساسي؟",
            options: ["appBar", "main", "content", "body"],
            correctAnswerIndex: 3,
            explanation: "خاصية الـ 'body' تعبر عن المحتوى الأساسي للـ Scaffold."
          }
        ]
      },
      {
        id: "button-interactions",
        title: "الأزرار والتفاعل",
        description: "تمتلك فلاتر الكثير من الأزرار الجاهزة: `ElevatedButton` و `TextButton` و `IconButton`.\n\nتأخذ هذه الأزرار الدالة `onPressed` لتخبر التطبق ماذا يجب أن يفعل عندما يضغط المستخدم على الزر.",
        callout: "خطأ شائع: تمرير مخرجات دالة للـ onPressed (مثل onPressed: doThing())، بدلاً من تمرير الدالة كتعريف (onPressed: doThing).",
        objectives: ["صنع أزرار تفاعلية قابلة للنقر", "التفريق بين أنواع الأزرار"],
        quiz: [
          {
            question: "الخاصية التي تجعل الزر ينفذ كود عند النقر عليه؟",
            options: ["onClick", "onTap", "onPressed", "action"],
            correctAnswerIndex: 2,
            explanation: "الأزرار في الفلاتر تستعمل خاصية 'onPressed'."
          }
        ]
      }
    ]
  },
  {
    id: "state",
    title: "٥. عديم الحالة مقابل صاحب الحالة",
    description: "اجعل تطبيقاتك تتفاعل مع المستخدم بفهم 'الحالة'.",
    lessons: [
      {
        id: "stateless-stateful",
        title: "Stateless و Stateful",
        description: "يكون الـ `StatelessWidget` بشكله الأساسي غير قابل للتغير—بمجرد أن يُرسم لا يمكن أن تتغير خصائصه.\n\nبينما الـ `StatefulWidget` يمتلك بيانات ('الحالة') قابلة للتغير ديناميكياً بمرور الوقت. إن كان الويدجت الخاص بك يتغير مرئياً استجابةً للمستخدم فيجب أن يكون **Stateful**.",
        objectives: ["فهم الاختلاف بين الـ widgets الثابتة والديناميكية"],
        quiz: [
          {
            question: "إذا كان للويدجت خانة اختيار تتطلب تفعيلاً مرئياً.. ماذا يجب أن يكون نوعه؟",
            options: ["StatelessWidget", "StatefulWidget", "InteractiveWidget", "ContainerWidget"],
            correctAnswerIndex: 1,
            explanation: "لأن حالته تتغير مرئياً (مؤشر/غير مؤشر)، فإنه يحتاج للـ StatefulWidget."
          }
        ]
      },
      {
        id: "counter",
        title: "setState() والعداد",
        description: "بداخل الـ StatefulWidget، لا يمكنك تغيير متغير للتعرف عليه الشاشة تلقائياً.\n\nيجب أن تغلف هذا التغير بداخل الدالة `setState()`! هذه الدالة الخارقة تخبر فلاتر: 'أهلاً، قد غيرت بيانة هنا، أرجو أن تحدث رسم الواجهة فوراً!'",
        callout: "وقت القياس: استعمال setState يشبه تحديث الصفحة في المتصفح بعد أن تقوم بحفظ بيانات في السيرفر.",
        objectives: ["تشغيل تحديث الواجهة بتفعيل setState"],
        quiz: [
          {
            question: "ما الدالة التي يجب استخدامها لإخبار فلاتر بإعادة رسم الويدجت ذو الحالة؟",
            options: ["redraw()", "updateUI()", "setState()", "build()"],
            correctAnswerIndex: 2,
            explanation: "تفعّل setState() عملية إعادة بناء الشاشة لتعكس الحالة الجدبدة."
          }
        ]
      }
    ]
  },
  {
    id: "next-steps",
    title: "٦. التنقل",
    description: "التنقل من شاشة إلى شاشة بسلاسة تامة.",
    lessons: [
      {
        id: "navigation-concept",
        title: "التنقل البسيط",
        description: "يتم التنقل بين الشاشات عن طريق مدير الشاشات `Navigator`.\n\nيمكنك استعمال `Navigator.push()` لتضع شاشة جديدة فوق السابقة، و `Navigator.pop()` لتُدمر الشاشة الحالية وتعود للسابق.",
        callout: "الـ Navigator يعمل كمكدس للطرق (Stack). الـ Push يضع عنصراً في القمة، بينما Pop يحذفه.",
        objectives: ["الإنتقال بكامل الشاشة لديناميكية فعالة", "الرجوع بأمان للماضي."],
        quiz: [
          {
            question: "كيف تنتقل عمداً إلى صفحة جديدة يتم وضعها في المكدس؟",
            options: ["Navigator.go()", "Navigator.push()", "Screen.next()", "App.change()"],
            correctAnswerIndex: 1,
            explanation: "تقوم Navigator.push() بإرسال وجهة (شاشة) جديدة في المكدس الخاص بمدير الشاشات."
          }
        ]
      }
    ]
  },
  {
    id: "lists",
    title: "٧. القوائم والمدخلات",
    description: "عبر عن بياناتك بكميات كبيرة واستمع للمستخدم.",
    lessons: [
      {
        id: "list-view",
        title: "القائمة (ListView)",
        description: "حين يكون عمودك (Column) مليئاً بالعناصر التي تتجاوز حجم الشاشة، سيظهر لك خطأ الشريط الأصفر والأسود.\n\nالحل هو استعمال `ListView`! هذه القائمة تتكفل بإنشاء محتوى قابل للتمرير يناسب النصوص المتكررة والمقاسات الديناميكية.",
        objectives: ["تنفيذ حاوية قابلة للتمرير والاحتواء بأمان تام"],
        quiz: [
          {
            question: "لماذا يجب عليك أن تستعمل ListView بدلاً من Column للكميات المهولة؟",
            options: ["الـ ListView يقبل التمرير التلقائي", "الـ ListView له خلفيات لامعة", "العمود لا يتحمل الـ Text", "لأنه صف بشكل مخفي"],
            correctAnswerIndex: 0,
            explanation: "يوفر الـ ListView تلقائياً سلوك التمرير إذا تعدى المحتوى مقاس الشاشة."
          }
        ]
      },
      {
        id: "text-field",
        title: "خانة الإدخال TextField",
        description: "`TextField` هو العنصر الأساسي لأخذ مدخلات لوحة التحكم من المستخدمين.\n\nحتى نجمع الجمل المكتوبة في الخانة بواسطة المستخدم، يتم ربط متحكم يُسمى بـ `TextEditingController` مباشرة بها.",
        callout: "تأكد دائماً من التخلص من الـ TextEditingController بواسطة دالة dispose() لتفادي حدوث تسريب في الذاكرة!",
        objectives: ["أخذ مدخلات من المستخدم عبر لوحة المفاتيح", "قراءة القيمة المعطاة لتخزينها واستعمالها النظيف"],
        quiz: [
          {
            question: "ما هو الكائن الذي يتم استخدامه لقراءة البيانات في الخانة النصية TextField ؟",
            options: ["InputManager", "TextReader", "TextEditingController", "StateController"],
            correctAnswerIndex: 2,
            explanation: "يتم ربط TextEditingController بالقيمة المدخلة في الـ TextField حتى يسمح بقراءتها والتعديل عليها."
          }
        ]
      }
    ]
  }
];

export function getCourseData(lang: string) {
  return lang === 'ar' ? courseDataAr : courseDataEn;
}

export function getLessonById(id: string, lang: string): { lesson: LessonContent, section: Section, index: number, total: number } | null {
  const data = getCourseData(lang);
  for (const section of data) {
    for (let i = 0; i < section.lessons.length; i++) {
      if (section.lessons[i].id === id) {
        return { lesson: section.lessons[i], section, index: i, total: section.lessons.length };
      }
    }
  }
  return null;
}

export function getFirstLessonId(): string {
  return courseDataEn[0].lessons[0].id;
}
