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
  },
  {
    id: 'essential-ui',
    title: '8. Essential UI Basics',
    description: 'Learn the fundamental UI structure and widgets like padding and unsafe areas.',
    lessons: [
      {
        id: 'widget-tree',
        title: 'Understanding the Widget Tree',
        description: 'Flutter UIs are composed of nested widgets inside widgets.\n\nTo build a screen, you wrap widgets around each other. Think of it like boxes inside boxes, or LEGO bricks forming a structure. The outermost widget is the root.',
        callout: 'Analogy time: Just like HTML tags nest inside one another (like <div> inside <body>), Flutter widgets nest to create the user interface.',
        objectives: ['Visualize the widget tree', 'Understand widget nesting'],
        durationMinutes: 5,
        quiz: [{
          question: 'What is the outermost widget typically called in Flutter?',
          options: ['The Tree', 'The Root', 'The Main', 'The Scaffold'],
          correctAnswerIndex: 1,
          explanation: 'The top-level widget that contains all other widgets is called the Root widget.'
        }]
      },
      {
        id: 'build-method',
        title: 'The build() Method',
        description: 'The `build(BuildContext context)` method is the most important method in Flutter. It is responsible for returning the actual UI widgets you see on screen.\n\nWhenever the state changes in a StatefulWidget, Flutter calls `build()` again to redraw the UI.',
        callout: 'Common Mistake: Thinking build() only runs once! It runs constantly whenever data updates. Do not put heavy network requests inside build().',
        objectives: ['Understand what build() returns', 'Know when build() is executed'],
        durationMinutes: 5,
        quiz: [{
          question: 'When does the build() method run?',
          options: ['Only once when the app starts', 'When the user closes the app', 'Whenever the state updates to redraw the UI', 'Only during Hot Reload'],
          correctAnswerIndex: 2,
          explanation: 'Every time state changes, Flutter runs the build() method again to find out what the UI should look like now.'
        }]
      },
      {
        id: 'padding-widget',
        title: 'The Padding Widget',
        description: 'While `Container` has a padding property, Flutter also has a dedicated `Padding` widget.\n\nBecause of Flutter\'s composition model, using a dedicated `Padding` widget is highly efficient when you just need to add space inside an area, rather than putting everything inside a heavier `Container`.',
        callout: 'Tip: Use EdgeInsets.all() for equal padding on all sides, or EdgeInsets.symmetric() to specify just vertical or horizontal padding.',
        objectives: ['Add inner spacing to widgets', 'Understand EdgeInsets'],
        durationMinutes: 4,
        quiz: [{
          question: 'Which class is used to define the amount of padding?',
          options: ['PaddingSize', 'EdgeInsets', 'MarginSpace', 'BoxSpace'],
          correctAnswerIndex: 1,
          explanation: 'EdgeInsets is used to specify offsets in terms of visual edges (top, bottom, left, right).'
        }]
      },
      {
        id: 'align-widget',
        title: 'The Align Widget',
        description: 'The `Align` widget explicitly positions a single child inside the available space of its parent.\n\nWhile `Center` aligns things perfectly in the middle, `Align` lets you choose any location like Top-Left, Bottom-Right, or exact coordinates.',
        callout: 'Did you know? The Center widget is actually just an Align widget under the hood, hardcoded to Alignment.center!',
        objectives: ['Align widgets structurally'],
        durationMinutes: 4,
        quiz: [{
          question: 'What property does the Align widget use to specify the position of its child?',
          options: ['position', 'location', 'alignment', 'center'],
          correctAnswerIndex: 2,
          explanation: 'The property is called "alignment" and takes an Alignment object like Alignment.bottomRight.'
        }]
      },
      {
        id: 'safe-area',
        title: 'The SafeArea Widget',
        description: 'Modern phones have notches, camera cutouts, and rounded corners. If you are not careful, your UI might draw underneath these physical hardware features, hiding your content!\n\nWrapping your layout in a `SafeArea` tells Flutter to add enough padding to avoid the notch, status bar, and bottom swipe indicators.',
        callout: 'Common Mistake: Usually, Scaffold handles safe areas for you if you use an AppBar. If you build a custom screen without an AppBar, you almost always need SafeArea!',
        objectives: ['Protect UI from physical screen cutouts'],
        durationMinutes: 4,
        quiz: [{
          question: 'What is the primary purpose of SafeArea?',
          options: ['Adding extra security to your app', 'Preventing UI elements from overlapping with system notches and bars', 'Saving battery life', 'Making the app safe for children'],
          correctAnswerIndex: 1,
          explanation: 'It automatically adds constraints and padding to keep your widgets in the visible, usable area of the screen.'
        }]
      },
      {
        id: 'icons-images',
        title: 'Icons and Images',
        description: 'Flutter makes rendering visual assets effortless. You can use the built-in `Icon` widget which provides thousands of Material icons out of the box.\n\nFor photos, the `Image` widget handles everything from local files (`Image.asset`) to downloading images from the internet (`Image.network`).',
        callout: 'Tip: Network images are loaded asynchronously. Be sure to provide a placeholder while the request is buffering!',
        objectives: ['Render Material and Cupertino icons', 'Display external and internal images'],
        durationMinutes: 5,
        quiz: [{
          question: 'Which widget constructor would you use to display an image straight from a URL?',
          options: ['Image.url', 'Image.internet', 'Image.asset', 'Image.network'],
          correctAnswerIndex: 3,
          explanation: 'Image.network takes a URL string and handles downloading and caching the image automatically.'
        }]
      }
    ]
  },
  {
    id: 'scrolling-layouts',
    title: '9. Scrolling & Layout in Real Screens',
    description: 'Learn how to handle widgets that get too big for the screen.',
    lessons: [
      {
        id: 'single-child-scrollview',
        title: 'SingleChildScrollView',
        description: 'When a layout has too many items, it will overflow the screen height, resulting in black-and-yellow hazard stripes.\n\nBy wrapping your Column in a `SingleChildScrollView`, you make the entire column scrollable. This is perfect for forms and long reading content.',
        callout: 'Common Mistake: Do not use this for a list of thousands of items! Use SingleChildScrollView for small, bounded content. For massive lists, use ListView.',
        objectives: ['Fix overflow issues by adding a scroll view'],
        durationMinutes: 4,
        quiz: [{
          question: 'When should you use SingleChildScrollView?',
          options: ['For a chat app with infinite messages', 'When your widgets slightly exceed the screen size and need to scroll', 'To lazily load content', 'To animate page transitions'],
          correctAnswerIndex: 1,
          explanation: 'It is ideal for static or structural content that is slightly too large for smaller device screens, like a long settings page.'
        }]
      },
      {
        id: 'list-tile',
        title: 'ListTile Basics',
        description: '`ListTile` is a highly opinionated structural widget that gives your lists a standard Material Design look.\n\nIt comes pre-configured with a `leading` (left side) widget for avatars or icons, a `title`, a `subtitle`, and a `trailing` widget (like a chevron).',
        callout: 'Tip: ListTiles often look best inside a ListView, but you can stick them inside a standard Column too!',
        objectives: ['Use ListTile for standard list elements', 'Implement leading and trailing properties'],
        durationMinutes: 5,
        quiz: [{
          question: 'Which property in a ListTile puts a widget on the far left side?',
          options: ['leading', 'trailing', 'start', 'front'],
          correctAnswerIndex: 0,
          explanation: 'The leading property is standard in Material design for icons or avatars at the start of a row.'
        }]
      },
      {
        id: 'column-overflow',
        title: 'Why Column Overflows',
        description: 'A Column tries to be as tall as all its children combined. If the children are taller than the screen, Flutter throws an overflow error instead of silently cutting them off.\n\nYou fix this by wrapping large, expanding children in `Expanded` (to constrain them), or by wrapping the whole Column in a scrollable view.',
        callout: 'Tip: You can actually combine Expanded AND scroll views perfectly, like expanding a chat list area while keeping a text input firmly at the bottom.',
        objectives: ['Diagnose the overflow boundary error', 'Resolve column overflows mathematically'],
        durationMinutes: 5,
        quiz: [{
          question: 'What do the yellow and black stripes visually indicate in Flutter?',
          options: ['A formatting error', 'A network error', 'A layout overflow error', 'A construction zone'],
          correctAnswerIndex: 2,
          explanation: 'These stripes show exactly where and how much the content has overflowed the available space boundaries.'
        }]
      }
    ]
  },
  {
    id: 'input-forms',
    title: '10. Input & Forms',
    description: 'Learn how to accept user input safely and handle form logic.',
    lessons: [
      {
        id: 'text-field-deep',
        title: 'TextField: onChanged vs controller',
        description: 'There are two main ways to read what a user types into a `TextField`.\n\nYou can use `onChanged` to fire an event every time a keystroke happens, updating state immediately. Alternatively, you can use a `TextEditingController` to silently track the value and only read it when a button is pressed.',
        callout: 'Common Mistake: If you use a TextEditingController, you MUST call .dispose() on it in the state dispose method to prevent memory leaks!',
        objectives: ['Track input using state', 'Read input using a controller'],
        durationMinutes: 6,
        quiz: [{
          question: 'Why might you prefer a TextEditingController over onChanged?',
          options: ['It changes text colors automatically', 'You only want to read the text when a Submit button is clicked, saving constant state rebuilds', 'You want the text to validate on every keystroke', 'It prevents errors when testing'],
          correctAnswerIndex: 1,
          explanation: 'Controllers allow you to "pull" the data whenever you want, rather than "pushing" the data to state on every single keystroke.'
        }]
      },
      {
        id: 'button-state',
        title: 'Enabled and Disabled Buttons',
        description: 'Forms need validation. You should not allow a user to submit an empty form.\n\nIn Flutter, buttons automatically appear disabled (grayed out) when their `onPressed` property is set to `null`. As soon as input is valid, you set `onPressed` to an actual function.',
        callout: 'Analogy time: A light switch with no wires connected is disabled. The moment you wire it up (pass a function to onPressed), it works and lights up!',
        objectives: ['Disable buttons gracefully via null callbacks'],
        durationMinutes: 4,
        quiz: [{
          question: 'How do you conventionally disable an ElevatedButton in Flutter?',
          options: ['Set disabled: true', 'Set the color to gray manually', 'Set onPressed to null', 'Wrap it in an IgnorePointer'],
          correctAnswerIndex: 2,
          explanation: 'If onPressed is null, the button intrinsically knows it is disabled and updates its styling and interaction states automatically.'
        }]
      },
      {
        id: 'checkbox-switch-radio',
        title: 'Checkbox, Switch, and Radio',
        description: 'Selection controls allow users to pick between predefined choices.\n\n`Checkbox` is for multiple yes/no selections. `Switch` is a toggle (like a light switch) often used in settings. `Radio` buttons ensure only ONE option out of a specific group can be selected.',
        callout: 'Tip: You must update the state value whenever the user interacts with these controls, or the visual box won\'t actually check!',
        objectives: ['Differentiate between checkboxes and radio groups', 'Handle toggle state bindings'],
        durationMinutes: 5,
        quiz: [{
          question: 'If you want a user to pick exactly ONE option out of four, which widget should you use?',
          options: ['Checkbox', 'Radio', 'Switch', 'TextButton'],
          correctAnswerIndex: 1,
          explanation: 'Radio buttons belong to a group and guarantee mutually exclusive selection.'
        }]
      },
      {
        id: 'dropdown-button',
        title: 'DropdownButton Basics',
        description: 'A `DropdownButton` lets the user pick one value from a collapsing menu.\n\nIt requires a current `value` and a list of `items` mapped to `DropdownMenuItem` widgets. Like other inputs, you must manually call `setState` inside `onChanged` for the new value to physically stick.',
        callout: 'Common Mistake: The value property you pass to the Dropdown must EXACTLY match the value of one of the DropdownMenuItems, or Flutter will crash!',
        objectives: ['Build interactive dropdowns and map data items'],
        durationMinutes: 5,
        quiz: [{
          question: 'What happens if the internal value property of DropdownButton doesn\'t match any of its items?',
          options: ['It selects the first item by default', 'It becomes an empty dropdown', 'Flutter will throw a runtime assertion error', 'It shows a disabled gray box'],
          correctAnswerIndex: 2,
          explanation: 'Flutter strictly enforces that the active value must exist in the menu list.'
        }]
      },
      {
        id: 'form-validation',
        title: 'Basic Form Validation',
        description: 'When building complex inputs, wrap all your `TextFormField` widgets inside a parent `Form` widget.\n\nThe `Form` takes a `GlobalKey`, which acts like a remote control. You can use this key to run `validate()` globally across all fields at once!',
        callout: 'Tip: Use TextFormField instead of TextField when you want built-in validation powers.',
        objectives: ['Handle GlobalKey states', 'Write simple text validators'],
        durationMinutes: 6,
        quiz: [{
          question: 'What widget wrappers give you the ability to validate multiple inputs at the same time?',
          options: ['Container and TextField', 'Form and TextFormField', 'ValidateGroup and InputField', 'GroupController and TextField'],
          correctAnswerIndex: 1,
          explanation: 'The Form widget coordinates the validation state of all its descendant TextFormField widgets.'
        }]
      }
    ]
  },
  {
    id: 'app-flow-reuse',
    title: '11. App Flow & Reuse',
    description: 'Structure a robust application with reusable code and multiple screens.',
    lessons: [
      {
        id: 'passing-data',
        title: 'Passing Data Between Screens',
        description: 'When navigating, you often need to send data (like a selected user ID) forward to the next screen.\n\nYou do this by adding variables to the constructor of the destination screen and passing the values when you call `Navigator.push`.',
        callout: 'Analogy time: Just like placing an order. You hand the barista your name (the data), and they build the exact cup of coffee (the new screen) for you.',
        objectives: ['Create custom widget constructors', 'Pass values through routing'],
        durationMinutes: 5,
        quiz: [{
          question: 'How do you conventionally pass a string from Screen A to Screen B in Flutter?',
          options: ['Using SharedPreferences', 'Saving it to a global variable', 'Passing it through the constructor arguments of Screen B', 'Writing to a database'],
          correctAnswerIndex: 2,
          explanation: 'Constructors are the cleanest and safest way to hand data directly to a new Widget.'
        }]
      },
      {
        id: 'named-routes',
        title: 'Named Routes',
        description: 'Instead of manually building a `MaterialPageRoute` every time, you can register a map of named routes inside your `MaterialApp`.\n\nNamed routes look like web URLs (`/settings`, `/profile`) and make navigating as simple as calling `Navigator.pushNamed`.',
        callout: 'Tip: Named routes are fantastic for deep-linking, allowing users to enter your app straight to a specific page.',
        objectives: ['Set up MaterialApp route maps'],
        durationMinutes: 4,
        quiz: [{
          question: 'Where do you define the map of Named Routes?',
          options: ['Inside the Scaffold', 'Inside the MaterialApp widget', 'Inside the Navigator itself', 'In the pubspec.yaml file'],
          correctAnswerIndex: 1,
          explanation: 'MaterialApp accepts a routes property that acts as the routing table for the whole app.'
        }]
      },
      {
        id: 'reusable-widgets-deep',
        title: 'Reusable Widgets',
        description: 'If you have a customized card or button you use everywhere, don\'t copy-paste the code!\n\nExtract it into its own `StatelessWidget`. By accepting parameters (like title, color, icon), you can reuse your custom widget perfectly while only maintaining one set of code.',
        callout: 'Common Mistake: Don\'t extract code into massive helper functions. Extracting code into independent classes (StatelessWidget) behaves much better with Flutter\'s performance engine.',
        objectives: ['Follow DRY (Don\'t Repeat Yourself) principles', 'Abstract logic into new Widgets'],
        durationMinutes: 6,
        quiz: [{
          question: 'Why is it better to extract repeated UI into a StatelessWidget rather than a helper method?',
          options: ['It requires fewer lines of code', 'It works better with the Flutter element tree and improves rendering performance', 'Helper methods cannot take arguments', 'You can only use hot reload on Widgets'],
          correctAnswerIndex: 1,
          explanation: 'Independent widgets have their own BuildContext and rebuild cycles, making the layout engine significantly faster.'
        }]
      },
      {
        id: 'theme-basics',
        title: 'Theme Basics',
        description: 'Don\'t hardcode colors on every widget. Use `ThemeData`!\n\nBy passing a `ThemeData` object to `MaterialApp`, every single built-in widget inherited from it instantly shares your brand colors, typography, and button shapings.',
        callout: 'Did you know? Flutter actually supports simultaneous light and dark themes using the theme and darkTheme properties within the MaterialApp!',
        objectives: ['Understand top-down Theme cascading'],
        durationMinutes: 5,
        quiz: [{
          question: 'How do widgets know what colors and fonts to default to?',
          options: ['They guess based on the OS', 'They look up the widget tree for the nearest Theme inherited widget', 'They use hardcoded defaults', 'They fetch them from the internet'],
          correctAnswerIndex: 1,
          explanation: 'Widgets inherit the Theme from the context tree, cascading down from MaterialApp or localized Theme providers.'
        }]
      },
      {
        id: 'async-basics',
        title: 'Async Basics',
        description: 'Sometimes, dart has to wait for slow things, like network data or a file read.\n\nDarts `Future` class and the `async/await` keywords let your code pause logic for these slow events without freezing the actual user interface.',
        callout: 'Analogy time: When you order food at a restaurant, you don\'t stand frozen staring at the kitchen. You take a buzzer (`Future`) and wait asynchronously, doing other things until it buzzes.',
        objectives: ['Grasp the concept of Futures', 'Understand async/await syntax'],
        durationMinutes: 6,
        quiz: [{
          question: 'What is a Future in Dart?',
          options: ['A widget that renders later', 'An object representing a potential value or error that will be available at some time in the future', 'A network request', 'A timer'],
          correctAnswerIndex: 1,
          explanation: 'Futures act as a placeholder. It represents computation that hasn\'t completed yet.'
        }]
      },
      {
        id: 'future-builder',
        title: 'FutureBuilder',
        description: 'How do you show a loading spinner while fetching data? Use a `FutureBuilder`!\n\nThis widget takes a `Future` and gives you a `snapshot` parameter containing the current state (`waiting`, `hasData`, `hasError`). You simply return a different widget for each state.',
        callout: 'Tip: Always show an error widget if snapshot.hasError is true, preventing users from seeing silent failures!',
        objectives: ['Build reactive UIs to asynchronous events'],
        durationMinutes: 6,
        quiz: [{
          question: 'When snapshot.connectionState is ConnectionState.waiting, what should you typically return?',
          options: ['An empty container', 'The data', 'A CircularProgressIndicator or loading skeleton', 'An error message'],
          correctAnswerIndex: 2,
          explanation: 'While waiting, you must provide the user visual feedback that a background process is resolving.'
        }]
      }
    ]
  },
  {
    id: 'state-management',
    title: '12. State Management',
    description: 'Learn how Flutter shares and updates data across the widget tree.',
    lessons: [
      {
        id: 'inherited-widget',
        title: 'InheritedWidget',
        description: "InheritedWidget is Flutter's built-in mechanism to pass data down the widget tree without manually threading it through constructors. It is the foundation that Provider and Riverpod are built on.",
        callout: "Common Mistake: Beginners often pass data down through 10 layers of constructors ('prop drilling'). InheritedWidget solves this by making data available to any descendant.",
        objectives: [
          'Understand the widget tree data problem',
          'See how InheritedWidget exposes data to descendants',
          'Recognize it as the base of all state management solutions',
        ],
        durationMinutes: 4,
        quiz: [
          {
            question: 'Which method does a widget call to read data from an InheritedWidget?',
            options: [
              'setState()',
              'context.dependOnInheritedWidgetOfExactType() or an of() helper',
              'Navigator.push()',
              'buildWhen()',
            ],
            correctAnswerIndex: 1,
            explanation: 'InheritedWidget data is usually read with context.dependOnInheritedWidgetOfExactType() directly or through a custom static of(context) helper.',
          },
        ],
      },
      {
        id: 'provider-basics',
        title: 'Provider (State Management)',
        description: "Provider is the most popular Flutter state management package. It wraps InheritedWidget in a much simpler API. A ChangeNotifier class holds your state and calls notifyListeners() when it changes. Consumer or context.watch() rebuilds the UI automatically.",
        callout: "Provider is so popular it was recommended by the Flutter team. For most apps, it's the right choice before reaching for more complex solutions.",
        objectives: [
          'Create a ChangeNotifier class',
          'Wrap the app in a ChangeNotifierProvider',
          'Read state with context.watch() and trigger changes with context.read()',
        ],
        durationMinutes: 5,
        quiz: [
          {
            question: 'What method triggers a UI rebuild in Provider?',
            options: ['refresh()', 'notifyListeners()', 'setState()', 'rebuildNow()'],
            correctAnswerIndex: 1,
            explanation: 'ChangeNotifier tells listening widgets to rebuild by calling notifyListeners().',
          },
          {
            question: 'Which widget watches a provider and rebuilds when it changes?',
            options: ['Builder', 'Consumer', 'Expanded', 'FutureBuilder'],
            correctAnswerIndex: 1,
            explanation: 'Consumer listens to the provider and rebuilds its builder whenever the provider changes.',
          },
        ],
      },
      {
        id: 'value-notifier',
        title: 'ValueNotifier & ValueListenableBuilder',
        description: "ValueNotifier is Flutter's lightweight alternative to full state management. It wraps a single value and notifies listeners when it changes. ValueListenableBuilder rebuilds only the widgets that actually need updating, making it very efficient.",
        callout: 'Use ValueNotifier when you only need to track ONE simple value (a counter, a toggle, a selected tab). It avoids the boilerplate of a full ChangeNotifier class.',
        durationMinutes: 3,
        quiz: [
          {
            question: 'What class do you use to listen to a ValueNotifier in the widget tree?',
            options: ['StreamBuilder', 'ValueListenableBuilder', 'ProviderScope', 'AnimatedBuilder'],
            correctAnswerIndex: 1,
            explanation: 'ValueListenableBuilder rebuilds whenever the wrapped ValueNotifier changes.',
          },
        ],
      },
    ],
  },
  {
    id: 'dart-advanced',
    title: '13. Dart Deep Dive',
    description: 'Strengthen your Dart fundamentals so advanced Flutter patterns feel natural.',
    lessons: [
      {
        id: 'null-safety',
        title: 'Null Safety',
        description: "Null safety means Dart guarantees a variable can never be null unless you explicitly say it can. This eliminates an entire class of runtime crashes. Use ? to declare nullable types, ! to assert non-null, ?? for fallback values, and late for variables initialized after declaration.",
        callout: "The dreaded 'Null check operator used on a null value' crash is a sign you used ! on something that was actually null. Always prefer ?? or ?. over !.",
        objectives: [
          'Understand nullable vs non-nullable types',
          'Use ?, !, ??, and late correctly',
          'Eliminate null pointer crashes',
        ],
        durationMinutes: 4,
        quiz: [
          {
            question: 'What operator provides a fallback when a value is null?',
            options: ['?.', '??', '!', 'as'],
            correctAnswerIndex: 1,
            explanation: 'The ?? operator returns the right-hand value when the left-hand side is null.',
          },
          {
            question: 'What does the late keyword do?',
            options: [
              'Makes a variable nullable forever',
              'Declares a non-nullable variable that will be initialized before use',
              'Forces a variable to rebuild',
              'Creates an asynchronous variable',
            ],
            correctAnswerIndex: 1,
            explanation: 'late tells Dart the variable will be assigned later, but definitely before it is read.',
          },
        ],
      },
      {
        id: 'streams-basics',
        title: 'Streams & StreamBuilder',
        description: 'A Future gives you one value in the future. A Stream gives you multiple values over time, like a conveyor belt of data. Use StreamBuilder in Flutter to rebuild your UI every time a new event arrives on the stream.',
        callout: 'Real-world streams: WebSocket messages, Firestore snapshots, sensor data, or simply a timer that ticks every second.',
        objectives: [
          'Understand the difference between Future and Stream',
          'Create a simple periodic Stream',
          'Use StreamBuilder to display live stream data',
        ],
        durationMinutes: 4,
        quiz: [
          {
            question: 'What widget rebuilds the UI each time a Stream emits a new value?',
            options: ['FutureBuilder', 'ValueListenableBuilder', 'StreamBuilder', 'AnimatedBuilder'],
            correctAnswerIndex: 2,
            explanation: 'StreamBuilder listens for stream events and rebuilds every time a new value arrives.',
          },
        ],
      },
      {
        id: 'dart-mixins',
        title: 'Mixins',
        description: "A Mixin lets you reuse a class's methods in multiple other classes without inheritance. Use the 'with' keyword. Mixins solve the problem of wanting to share behavior between classes that don't share a parent.",
        callout: "Flutter uses mixins everywhere internally. SingleTickerProviderStateMixin is one you'll use for animations. Understanding mixins unlocks these advanced Flutter patterns.",
        durationMinutes: 3,
        quiz: [
          {
            question: 'What keyword applies a mixin to a class?',
            options: ['extends', 'implements', 'with', 'mixes'],
            correctAnswerIndex: 2,
            explanation: 'You apply a mixin to a class in Dart with the with keyword.',
          },
        ],
      },
    ],
  },
  {
    id: 'animations',
    title: '14. Animations',
    description: 'Move from static interfaces to fluid, expressive Flutter experiences.',
    lessons: [
      {
        id: 'animated-container',
        title: 'AnimatedContainer',
        description: 'AnimatedContainer is the easiest way to animate in Flutter. It works exactly like a regular Container, but whenever its properties change (size, color, border radius), it automatically animates the transition using a duration and curve you specify.',
        callout: "AnimatedContainer only animates between two known states. For more complex, looping, or physics-based animations, you'll need AnimationController.",
        objectives: [
          'Use AnimatedContainer to animate property changes',
          'Control animation duration and curve',
          'Understand implicit vs explicit animations',
        ],
        durationMinutes: 3,
        quiz: [
          {
            question: 'What two parameters control how AnimatedContainer animates?',
            options: ['height and width', 'duration and curve', 'child and alignment', 'padding and margin'],
            correctAnswerIndex: 1,
            explanation: 'duration controls how long the animation runs, and curve controls how it accelerates and decelerates.',
          },
        ],
      },
      {
        id: 'animation-controller',
        title: 'AnimationController',
        description: "AnimationController gives you full, precise control over animations. You define the duration and then drive the animation forward, backward, or repeat it. Use a Tween to map the animation's 0.0-1.0 value to a range like 0.0-300.0 (size) or Color.red-Color.blue.",
        callout: "Always call animationController.dispose() in the State's dispose() method. Forgetting this causes memory leaks.",
        objectives: [
          'Create an AnimationController with a Tween',
          'Use forward(), reverse(), and repeat()',
          'Properly dispose of controllers',
        ],
        durationMinutes: 5,
        quiz: [
          {
            question: 'What mixin must a State class use to get a vsync for AnimationController?',
            options: [
              'AutomaticKeepAliveClientMixin',
              'SingleTickerProviderStateMixin',
              'ChangeNotifier',
              'InheritedWidget',
            ],
            correctAnswerIndex: 1,
            explanation: 'SingleTickerProviderStateMixin supplies the vsync needed by AnimationController.',
          },
          {
            question: 'What method starts an animation playing forward?',
            options: ['play()', 'begin()', 'forward()', 'resume()'],
            correctAnswerIndex: 2,
            explanation: 'Call forward() on the AnimationController to start it from the beginning toward the end.',
          },
        ],
      },
      {
        id: 'hero-animation',
        title: 'Hero Animation',
        description: 'The Hero animation creates a smooth visual transition of a widget between two screens. You wrap the same widget on both screens with a Hero widget and give both the same tag. Flutter automatically animates the widget flying from one screen to the other.',
        callout: 'The tag must be unique per Hero on screen. If two Heroes have the same tag on the same screen, Flutter will throw an error.',
        objectives: [
          'Wrap a widget in Hero on both screens',
          'Understand the tag matching system',
          'Create seamless screen transitions',
        ],
        durationMinutes: 3,
        quiz: [
          {
            question: 'What property must match between the two Hero widgets for the animation to work?',
            options: ['curve', 'duration', 'tag', 'child'],
            correctAnswerIndex: 2,
            explanation: 'Flutter matches Hero widgets across routes by comparing their tag values.',
          },
        ],
      },
    ],
  },
  {
    id: 'data-backend',
    title: '15. Data & Backend',
    description: 'Connect Flutter UIs to APIs, local storage, and structured data.',
    lessons: [
      {
        id: 'json-serialization',
        title: 'JSON Serialization',
        description: "APIs return JSON text. Dart's jsonDecode() converts it to a Map<String, dynamic>. You then typically create a Dart class with a fromJson() factory constructor to safely convert the map into a typed object.",
        callout: "Common Mistake: Accessing a JSON key that doesn't exist returns null, which crashes if your variable is non-nullable. Always validate your JSON structure or use null-safe access with ??.",
        objectives: [
          'Use jsonDecode() to parse a JSON string',
          'Create a fromJson() factory constructor',
          'Safely access nested JSON fields',
        ],
        durationMinutes: 4,
        quiz: [
          {
            question: 'Which Dart function converts a JSON string to a Map?',
            options: ['jsonParse', 'jsonDecode', 'mapDecode', 'decodeJsonMap'],
            correctAnswerIndex: 1,
            explanation: 'jsonDecode() parses JSON text into Dart collections like Map<String, dynamic>.',
          },
          {
            question: 'What is the type of a decoded JSON object in Dart?',
            options: ['Map<int, String>', 'List<dynamic>', 'Map<String, dynamic>', 'Object<String>'],
            correctAnswerIndex: 2,
            explanation: 'A decoded JSON object becomes a Map<String, dynamic> in Dart.',
          },
        ],
      },
      {
        id: 'http-basics',
        title: 'HTTP Requests with http package',
        description: "The http package is Flutter's standard way to make network requests. http.get() returns a Future<Response>. Check response.statusCode == 200 for success, then pass response.body to jsonDecode(). Always handle loading and error states.",
        callout: 'Never make http calls directly inside the build() method. Always put them in initState(), a button handler, or a separate service class.',
        objectives: [
          'Make a GET request with http.get()',
          'Check the status code',
          'Parse the response body as JSON',
        ],
        durationMinutes: 4,
        quiz: [
          {
            question: 'What status code means a successful HTTP response?',
            options: ['100', '200', '301', '500'],
            correctAnswerIndex: 1,
            explanation: 'A 200 status code means the server successfully returned the requested response.',
          },
          {
            question: 'What property contains the response text from an http.get() call?',
            options: ['response.text', 'response.payload', 'response.body', 'response.contentText'],
            correctAnswerIndex: 2,
            explanation: 'The response body is available as plain text through response.body.',
          },
        ],
      },
      {
        id: 'shared-preferences',
        title: 'SharedPreferences',
        description: "SharedPreferences lets you persist small amounts of key-value data locally on the device. It's perfect for saving user settings, tokens, or onboarding state. Data persists across app restarts.",
        callout: 'SharedPreferences is NOT a database. Never store large data, lists of objects, or sensitive data like passwords in SharedPreferences. Use Hive or SQLite for structured local data.',
        objectives: [
          'Save and read values with SharedPreferences',
          'Understand async initialization with getInstance()',
          'Know when to use SharedPreferences vs a local database',
        ],
        durationMinutes: 3,
        quiz: [
          {
            question: 'What method returns the SharedPreferences instance?',
            options: [
              'SharedPreferences.open()',
              'SharedPreferences.create()',
              'SharedPreferences.getInstance()',
              'SharedPreferences.load()',
            ],
            correctAnswerIndex: 2,
            explanation: 'SharedPreferences.getInstance() asynchronously returns the local key-value storage instance.',
          },
        ],
      },
    ],
  },
  {
    id: 'testing-debugging',
    title: '16. Testing & Debugging',
    description: 'Learn how to verify app behavior, catch bugs early, and inspect Flutter layouts with confidence.',
    lessons: [
      {
        id: 'widget-testing',
        title: 'Widget Testing',
        description: 'Widget tests run your Flutter UI in a lightweight test environment. You can pump a widget, tap buttons, enter text, and assert what appears on screen. They are faster than full integration tests and ideal for verifying UI behavior.',
        callout: "Widget tests do not run on a real device. That makes them fast, but platform-specific behavior may still need integration testing.",
        objectives: [
          'Use testWidgets() to define a widget test',
          'Interact with the UI using WidgetTester',
          'Assert visible output with expect() and finder methods',
        ],
        durationMinutes: 4,
        quiz: [
          {
            question: 'Which Flutter testing function is used to define a widget test?',
            options: ['testWidgets', 'runWidgetTest', 'widgetTest', 'pumpWidget'],
            correctAnswerIndex: 0,
            explanation: 'testWidgets() is the standard Flutter test function for building and interacting with widgets in tests.',
          },
          {
            question: 'Which object taps buttons, enters text, and pumps frames inside a widget test?',
            options: ['BuildContext', 'WidgetTester', 'AnimationController', 'InheritedWidget'],
            correctAnswerIndex: 1,
            explanation: 'WidgetTester is the object Flutter gives you for driving the widget tree during a test.',
          },
        ],
      },
      {
        id: 'unit-testing',
        title: 'Unit Testing',
        description: 'Unit tests verify pure Dart logic without rendering any UI. They are the fastest way to catch calculation, parsing, and business-logic bugs because they focus on one function or class at a time.',
        callout: 'If your business logic is difficult to unit test, that is often a sign that too much logic is trapped inside widgets instead of plain Dart classes.',
        objectives: [
          'Test a pure Dart function in isolation',
          'Compare expected and actual values with expect()',
          'Keep business logic separate from UI code',
        ],
        durationMinutes: 3,
        quiz: [
          {
            question: 'What function do you use in Dart tests to compare an actual value against an expected one?',
            options: ['assertValue', 'expect', 'verify', 'compare'],
            correctAnswerIndex: 1,
            explanation: 'expect() is the core assertion function used throughout Dart and Flutter tests.',
          },
        ],
      },
      {
        id: 'flutter-inspector',
        title: 'Flutter Inspector',
        description: 'Flutter Inspector is the visual debugging tool inside DevTools. It lets you inspect the widget tree, understand layout constraints, reveal padding, and identify which widget is responsible for the space you see on screen.',
        callout: "When a layout looks wrong, do not guess. Open the Inspector and let Flutter show you the exact widget tree, spacing, and constraints involved.",
        objectives: [
          'Inspect the widget tree visually',
          'Reveal padding and layout constraints',
          'Use selection mode to identify problem widgets',
        ],
        durationMinutes: 4,
        quiz: [
          {
            question: 'Which DevTools feature shows the widget tree, padding, and layout details of the current Flutter screen?',
            options: ['Widget Catalog', 'Flutter Inspector', 'Hot Reload', 'Pub Manager'],
            correctAnswerIndex: 1,
            explanation: 'Flutter Inspector is the DevTools feature designed for visual UI debugging and tree inspection.',
          },
        ],
      },
    ],
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
  },
  {
    id: 'essential-ui',
    title: '8. أساسيات واجهة المستخدم',
    description: 'تعلم هيكل واجهة المستخدم الأساسي والعناصر مثل المساحة الداخلية والمناطق غير الآمنة.',
    lessons: [
      {
        id: 'widget-tree',
        title: 'فهم شجرة الويدجت (Widget Tree)',
        description: 'تتكون واجهات فلاتر من ويدجت متداخلة بداخل ويدجت أخرى.\n\nلبناء شاشة، تقوم بلف الويدجت حول بعضها البعض. فكر فيها كصناديق داخل صناديق، أو مكعبات ليغو تشكل هيكلاً. يُطلق على الويدجت الأبعد اسم "الجذر" (Root).',
        callout: 'وقت القياس: تمامًا كما تتداخل علامات HTML في بعضها البعض (مثل <div> داخل <body>)، تتداخل ويدجت فلاتر لإنشاء واجهة المستخدم.',
        objectives: ['تصور شجرة الويدجت', 'فهم تداخل الويدجت'],
        durationMinutes: 5,
        quiz: [{
          question: 'ما يسمى الويدجت الخارجي في فلاتر عادة؟',
          options: ['الشجرة (The Tree)', 'الجذر (The Root)', 'الرئيسي (The Main)', 'السقالة (The Scaffold)'],
          correctAnswerIndex: 1,
          explanation: 'أعلى ويدجت يحتوي على جميع الويدجت الأخرى يسمى ويدجت الجذر.'
        }]
      },
      {
        id: 'build-method',
        title: 'دالة build()',
        description: 'دالة `build(BuildContext context)` هي الطريقة الأكثر أهمية في فلاتر. إنها المسؤولة عن إرجاع الويدجت الفعلية التي تراها على الشاشة.\n\nكلما تغيرت الحالة في StatefulWidget، يقوم فلاتر باستدعاء `build()` مرة أخرى لإعادة رسم واجهة المستخدم.',
        callout: 'خطأ شائع: التفكير في أن build() تعمل مرة واحدة فقط! إنها تعمل باستمرار كلما تم تحديث البيانات. لا تضع طلبات الشبكة الثقيلة داخل build().',
        objectives: ['فهم ما يعود من build()', 'معرفة متى يتم تنفيذ build()'],
        durationMinutes: 5,
        quiz: [{
          question: 'متى تعمل دالة build()؟',
          options: ['مرة واحدة فقط عند بدء التطبيق', 'عندما يغلق المستخدم التطبيق', 'كلما تم تحديث الحالة لإعادة رسم الواجهة', 'فقط أثناء Hot Reload'],
          correctAnswerIndex: 2,
          explanation: 'في كل مرة تتغير فيها الحالة، يقوم فلاتر بتشغيل دالة build() مرة أخرى لمعرفة كيف يجب أن تبدو الواجهة الآن.'
        }]
      },
      {
        id: 'padding-widget',
        title: 'ويدجت Padding',
        description: 'بينما يحتوي الـ `Container` على خاصية مسافة داخلية (padding)، فإن فلاتر يمتلك أيضًا ويدجت `Padding` مخصصة.\n\nبسبب نموذج تكوين فلاتر، فإن استخدام ويدجت `Padding` المخصصة فعال للغاية عندما تحتاج فقط إلى إضافة مساحة داخل منطقة ما، بدلاً من وضع كل شيء داخل `Container` أثقل.',
        callout: 'نصيحة: استخدم EdgeInsets.all() لمسافة متساوية على جميع الجوانب، أو EdgeInsets.symmetric() لتحديد مسافة عمودية أو أفقية فقط.',
        objectives: ['إضافة مسافة داخلية للويدجت', 'فهم مبدأ EdgeInsets'],
        durationMinutes: 4,
        quiz: [{
          question: 'أي فئة تُستخدم لتحديد مقدار المساحة الداخلية (Padding)؟',
          options: ['PaddingSize', 'EdgeInsets', 'MarginSpace', 'BoxSpace'],
          correctAnswerIndex: 1,
          explanation: 'يتم استخدام EdgeInsets لتحديد الإزاحات من حيث الحواف المرئية (أعلى، أسفل، يسار، يمين).'
        }]
      },
      {
        id: 'align-widget',
        title: 'ويدجت Align',
        description: 'يحدد ويدجت `Align` بوضوح موضع طفل واحد داخل المساحة المتاحة لوالده.\n\nبينما يقوم `Center` بمحاذاة الأشياء تمامًا في المنتصف، يتيح لك `Align` اختيار أي موقع مثل أعلى اليسار، أسفل اليمين، أو إحداثيات دقيقة.',
        callout: 'هل تعلم؟ إن ويدجت Center هو في الواقع مجرد ويدجت Align تحت الغطاء، ومبرمج كـ Alignment.center!',
        objectives: ['محاذاة الويدجت هيكليًا'],
        durationMinutes: 4,
        quiz: [{
          question: 'ما الخاصية التي يستخدمها ويدجت Align لتحديد موضع طفله؟',
          options: ['position', 'location', 'alignment', 'center'],
          correctAnswerIndex: 2,
          explanation: 'الخاصية تسمى "alignment" وتأخذ كائن Alignment مثل Alignment.bottomRight.'
        }]
      },
      {
        id: 'safe-area',
        title: 'ويدجت SafeArea',
        description: 'تحتوي الهواتف الحديثة على نتوءات (Notch)، وفتحات كاميرا، وزوايا دائرية. إذا لم تكن حذرًا، فقد تُرسم واجهتك تحت هذه الميزات، مما يخفي المحتوى الخاص بك!\n\nيخبر التفاف مخططك في `SafeArea` فلاتر بإضافة مساحة كافية لتجنب النتوء، وشريط الحالة، ومؤشرات السحب السفلية.',
        callout: 'خطأ شائع: عادةً، يتعامل Scaffold مع المناطق الآمنة لك إذا كنت تستخدم AppBar. إذا قمت ببناء شاشة مخصصة بدون AppBar، فستحتاج دائمًا تقريبًا إلى SafeArea!',
        objectives: ['حماية واجهة المستخدم من أجزاء الشاشة المقتطعة فيزيائيا'],
        durationMinutes: 4,
        quiz: [{
          question: 'ما هو الغرض الرئيسي من SafeArea؟',
          options: ['إضافة أمان إضافي لتطبيقك', 'منع تداخل عناصر واجهة المستخدم مع النتوءات والأشرطة الخاصة بالنظام', 'توفير عمر البطارية', 'جعل التطبيق آمنًا للأطفال'],
          correctAnswerIndex: 1,
          explanation: 'تضيف تلقائيًا قيودًا ومساحة إضافية للحفاظ على الويدجت في المنطقة المرئية والقابلة للاستخدام من الشاشة.'
        }]
      },
      {
        id: 'icons-images',
        title: 'الأيقونات والصور',
        description: 'يجعل فلاتر من السهل تقديم الأصول المرئية. يمكنك استخدام ويدجت `Icon` المدمجة التي توفر الآلاف من Material icons.\n\nبالنسبة للصور، يتعامل ويدجت `Image` مع كل شيء بدءًا من الملفات المحلية (`Image.asset`) إلى الصور عبر الإنترنت (`Image.network`).',
        callout: 'نصيحة: يتم تحميل صور الشبكة بشكل غير متزامن. تأكد من توفير عنصر نائب (placeholder) بالانتظار.',
        objectives: ['عرض أيقونات Material و Cupertino', 'عرض الصور الداخلية والخارجية'],
        durationMinutes: 5,
        quiz: [{
          question: 'أي جزء يمكنك استخدامه لعرض صورة مباشرة من رابط (URL)؟',
          options: ['Image.url', 'Image.internet', 'Image.asset', 'Image.network'],
          correctAnswerIndex: 3,
          explanation: 'يأخذ Image.network عنوان URL ويتعامل تلقائياً مع تحميله وتخزينه المؤقت.'
        }]
      }
    ]
  },
  {
    id: 'scrolling-layouts',
    title: '9. التمرير العرضي والهيكلة',
    description: 'تعلم كيف تتعامل مع العناصر التي يصبح حجمها أكبر من الشاشة.',
    lessons: [
      {
        id: 'single-child-scrollview',
        title: 'ويدجت SingleChildScrollView',
        description: 'عندما يحتوي تخطيطك على عناصر أكثر مما يسع الشاشة عموديًا، ينتج عنه خطأ أسود وأصفر.\n\nببساطة عن طريق لف الـ Column الخاص بك بـ `SingleChildScrollView`، تصبح الشاشة قابلة للتمرير. هذا مثالي للنماذج والمقالات.',
        callout: 'خطأ شائع: لا تستخدم هذا للأزرار التي تحتوي الآلاف من العناصر! استخدم SingleChildScrollView للمحتوى الهيكلي المحدود. للقوائم الضخمة، استخدم ListView.',
        objectives: ['حل مشكلة "التجاوز" Overflow بإضافة ميزة التمرير'],
        durationMinutes: 4,
        quiz: [{
          question: 'متى يجب أن تستخدم SingleChildScrollView؟',
          options: ['لتطبيقات الدردشة حيث المحادثات اللانهائية', 'عندما تتجاوز مكوناتك بقليل حجم الشاشة وتحتاج للتمرير', 'للتحميل المكسل للمحتوى', 'لتمرير تأثيرات شاشات متعددة'],
          correctAnswerIndex: 1,
          explanation: 'إنه مثالي للمحتوى الاستاتيكي الخاص بصفحة تحتاج لمساحة إضافية قليلة.'
        }]
      },
      {
        id: 'list-tile',
        title: 'أساسيات ListTile',
        description: '`ListTile` هو أداة مهيكلة لتتبع أحدث إصدارات الـ Material Design للقوائم.\n\nيأتي مزود بمكونات مبنية مسبقا كـ `leading` (أداة يسار للعرض والمقدمة)، `title` للعنوان، `subtitle` للوصف المساعد، و `trailing` للذيل.',
        callout: 'نصيحة: يستخدم ListTile كثيرا داخل ListView ولكنه ينجز بشكل كامل حتى عندما يدرج بـ Column.',
        objectives: ['استخدم ListTile لعناصر القائمة المعيارية'],
        durationMinutes: 5,
        quiz: [{
          question: 'أي خاصية داخل ListTile تضع المؤشر أو الأيقونة أقصى اليسار؟',
          options: ['leading', 'trailing', 'start', 'front'],
          correctAnswerIndex: 0,
          explanation: 'تُستَخدم خاصية leading للمعايير الخاصة بالـ Material لترشيح مساعدة بصرية في بداية العنصر.'
        }]
      },
      {
        id: 'column-overflow',
        title: 'لماذا تتعطل أعمدة Column؟',
        description: 'يحاول الـ Column أخذ الحيز الرأسي بناء لارتفاعات أطفاله مجمعة. إن كان الطول مبالغاً أو غير منتهي، يلقي فلاتر خطأ "التجاوز القاتل" بحواجز سوداء وصفراء.\n\nيعالج ذلك التفاف الأطفال الـ `Expanded` أو إضافة تمرير مرئي للأب.',
        callout: 'نصيحة: يمكنك الجمع بين Expanded ومكونات التمرير بذكاء للحفاظ على هيكل متوازن للقسم العلوي وتمرير للآخر.',
        objectives: ['تشخيص أخطاء حدود التجاوز Overflow', 'إصلاح التجاوز بمعرفات Column'],
        durationMinutes: 5,
        quiz: [{
          question: 'ما الذي تمثله إشارة الجدار المخطط بالأصفر والأسود بصريًا؟',
          options: ['خطأ في تنسيق الكود', 'مشكلة متعلقة بالشبكة الخلوية', 'خطأ تجاوز المحتوى للحدود المسموحة Overflow', 'تحميل وتوقف مؤقت'],
          correctAnswerIndex: 2,
          explanation: 'يظهر هذا الخطأ أين تماماً وكم بيكسل أحدثه تجاوز العناصر من مساحة الـ widget الأصلي والمحاسب.'
        }]
      }
    ]
  },
  {
    id: 'input-forms',
    title: '10. الإدخال والنماذج',
    description: 'اعرف كيف تستقبل إدخال المستخدم بأمان وفعالية.',
    lessons: [
      {
        id: 'text-field-deep',
        title: 'TextField: onChanged ضد controller',
        description: 'هنالك طريقتان للتعرف على ما يكتبه المستخدم في الـ `TextField`.\n\nيمكنك استخدام `onChanged` لإصدار تحديث للحالة من أول كل مدخل جديد أو ضغطة. وبدلاً عن هذا، يمكنك الاستعانة بـ `TextEditingController` لمداركة القيمة بصمت.',
        callout: 'ملاحظة عامة: إذا استخدمت TextEditingController يجي عليك استدعاء وظيفة الحذف والتخلص .dispose() له بداخل dispose لتجنب هدر الذاكرة.',
        objectives: ['تتبع المدخلات بواسطة الحالة', 'قراءة المدخلات عن طريق التحكم Controller'],
        durationMinutes: 6,
        quiz: [{
          question: 'لِمَ قد تفضل استخدام TextEditingController بدلاً من onChanged؟',
          options: ['يغير لون ونسق النصوص آلياً', 'فقط تود الحصول على القيمة حال ضغط على إرسال، لتقليل إعادة رسم الشاشة', 'تود من النص قبول تعديلي بكل مدخلات سريعة', 'يقي من الأخطاء أثناء اختبار الشيفرات'],
          correctAnswerIndex: 1,
          explanation: 'يسمح الكنترول بسحب القيمة لا دمج الدفع الآلي بالحالة مع كل حرف مكتوب.'
        }]
      },
      {
        id: 'button-state',
        title: 'حالة الأزرار المفعّلة وغير المفعّلة',
        description: 'لبعض النماذج قيود وأحكام. يجب ألا تدع المستخدم يرسل نموذجاً فارغاً.\n\nفي فلاتر، تتغير حالة الزر ويصبح رمادي المظهر باهت بمجرد إدراج خاصية `onPressed` على قيمة فارغة وهي `null`. ما أن يصح الإدخال تفعله بإحلال دالة صحيحة.',
        callout: 'وقت القياس: مقبس الكهربائي الغير موصل بأسلاك باهت معطل. متى ما اوصلت له سلك (الدالة)، أضاء وفعّل التوصيل!',
        objectives: ['إبطال وتوقيف عمل الأزرار بربطه بـ null'],
        durationMinutes: 4,
        quiz: [{
          question: 'كيف تعطل الزر تقليديًا في فلاتر؟',
          options: ['إدراج disabled: true', 'تغيير لونه للون رمادي يدوياً', 'إحلال onPressed إلى null', 'إدراج IgnorePointer للزر'],
          correctAnswerIndex: 2,
          explanation: 'ما أن يصبح onPressed null استوعب الزر انه في حالة مقيدة فعطل التفاعل وشكله آلياً.'
        }]
      },
      {
        id: 'checkbox-switch-radio',
        title: 'الـ Checkbox، الـ Switch وكذا الـ Radio',
        description: 'تسمح قوائم التحكم للمستخدم بتحديد الاختيارات.\n\nالـ `Checkbox` للإجابات المتعددة، الـ `Switch` للتفعيل والتوقيف، والـ `Radio` تضمن من مجموعة عدم اختيار أكثر من خيار واحد.',
        callout: 'نصيحة: ينبغي التغيير برصد التحديث لحالة التحكم من خلال onChanged، لتنعكس مرئياً.',
        objectives: ['التفريق بين اختيارات المهام المعددة', 'التعامل مع تبادل الحال للحاسبة'],
        durationMinutes: 5,
        quiz: [{
          question: 'إذا أردت جعل التحديد محصورا على خيار واحد من أربعة للمستخدم، فأي ويدجت أنسب؟',
          options: ['Checkbox', 'Radio', 'Switch', 'TextButton'],
          correctAnswerIndex: 1,
          explanation: 'تتبع أزرار Radio مجموعة واحدة يضمن التمرير المنفرد فقط.'
        }]
      },
      {
        id: 'dropdown-button',
        title: 'اساسيات DropdownButton',
        description: 'الـ `DropdownButton` يسمح بانتقال وإظهار قيمة اختيارية عبر القائمة المنسدلة.\n\nويستدعي القيمة الحالية كـ `value`، واللواحق المدرجة للقائمة بـ `items` المحتاجة لتحديث `setState` عند تغير القيمة المتصلة `onChanged`.',
        callout: 'من الخطأ أن تعتمد قيمة افتراضية ليست من ضمن الخيارات، فذلك يتسبب بتحطيم الشاشة وتوقف فلاتر.',
        objectives: ['بناء القوائم المنسدلة التفاعلية'],
        durationMinutes: 5,
        quiz: [{
          question: 'ما يحدث للمنسدلة في حال أُسندت قيمة value بخيار لا يطابق أيٍ مما بداخل عناصرitems ؟',
          options: ['يتم تغيير وادراج العنصر الأول افتراضيًا', 'تصبح منسدلة فارغة', 'يلقي פלאטר بخطأ وتعطل في الواجهة', 'تعرض الزر بصورة باهتة معطلة'],
          correctAnswerIndex: 2,
          explanation: 'يفرض فلاتر بشدة أن تكون القيمة الحالية موجودة تماماً في قائمة الخيارات المنسدلة.'
        }]
      },
      {
        id: 'form-validation',
        title: 'أساسيات التحقق للنموذج',
        description: 'حين بناء نموذج دقيق، يُفضل تبويبه عبر لفافة `Form`.\n\nيستلزم الـ `Form` الـ `GlobalKey` الذي يعمل كجهاز تحكم، باستخدامه يمكننا تشغيل خاصية المراجعة `validate()` بالاعتبار جميع مداخل `TextFormField`.',
        callout: 'نصيحة: استخدم TextFormField كبديل لـ TextField عندما تستقي خصائص التحقق البنائية.',
        objectives: ['التعامل كلياً بمتغيرات GlobalKey', 'كتابة خصائص مبسطة للتحقق النصوص'],
        durationMinutes: 6,
        quiz: [{
          question: 'ماهو ويدجت التغليف المتولى للمصادقة المراجعية لعدة قيم إدخالية دفعة واحدة؟',
          options: ['Container و TextField', 'Form و TextFormField', 'ValidateGroup و InputField', 'GroupController و TextField'],
          correctAnswerIndex: 1,
          explanation: 'تقوم Form بتنسيق حالة المراجعة والمصادقة لجميع منحنيات TextFormField المتسقة أسفلها.'
        }]
      }
    ]
  },
  {
    id: 'app-flow-reuse',
    title: '11. مسار التطبيق وإعادة الاستخدام',
    description: 'هيكلة تطبيق قوي ذو مرونة من خلال تعدد الشاشات والعناصر المعادة الاستخدام.',
    lessons: [
      {
        id: 'passing-data',
        title: 'تمرير البيانات بين الشاشات',
        description: 'عند عمليات الانتقال، قد تحتاج أحيانا تمرير بيانات كـ (معرف شخص، او تحديد غرض) وارسالها للشاشة التالية.\n\nتحصل على هذا المرام بإضافة متغيرات بنائية `constructor` للمقاصد وعند تمرير وفتح شاشة الإتصال عبر `Navigator.push`.',
        callout: 'وقت القياس: تشبه عملية تقديم الطلبات. تمنح أمين الصندوق المسمى، ليعدوا فنجلنك بالوجه التام وبكل الإضافات.',
        objectives: ['عمل دوال بناء widgets مخصصة للارسال'],
        durationMinutes: 5,
        quiz: [{
          question: 'كيف يتوجه إليك تمرير نص محدد من Screen A إلى Screen B في فلاتر؟',
          options: ['عبر استخدام SharedPreferences', 'إضافته لتمثيلات قيم عامة العالمية', 'بتمريره عبر متغيرات الـ constructor لـ Screen B', 'رفع الكتابة للبيانات والتخزين'],
          correctAnswerIndex: 2,
          explanation: 'الـ constructors هي الأنظف والطريقة الأصيلة والأضمن لتسليم بيانات مستهدفة ومباشرة للـ Widget المخصص.'
        }]
      },
      {
        id: 'named-routes',
        title: 'المسارات المسماة',
        description: 'بدلًا من بناء واستخدام الانتقال اليدوي `MaterialPageRoute` باستمرار المتكرر، تستطيع توثيق حزمة متكاملة وباسم مسارات ضمن `MaterialApp`.\n\nالمسارات المسماة تعكس شكلها كهيكل روابط الويب (`/settings`، `/profile`) لجعل الانتقال بوضعه الاستدعائي للمسار عبر `Navigator.pushNamed`.',
        callout: 'نصيحة: المسارات المعرّفة المسماة فعالة وتفيده لعمق الاستخدام والروابط المعمقة (Deep-linking).',
        objectives: ['أقمت جدول الملاحة والمسارات بداخل الـ MaterialApp'],
        durationMinutes: 4,
        quiz: [{
          question: 'أين يتم تخليق قاموس المسارات المسماة؟',
          options: ['بداخل الـ Scaffold', 'داخل مكون الـ MaterialApp', 'بداخل حاوية الـ Navigator', 'ضمن ملف الـ pubspec.yaml'],
          correctAnswerIndex: 1,
          explanation: 'يحتوي الـ MaterialApp على مسارات تخصيص كقاموس وملاحة تنقل للتطبيق بأكمله.'
        }]
      },
      {
        id: 'reusable-widgets-deep',
        title: 'الـ Widgets المعادة الاستخدام',
        description: 'إن كان تطبيقك مفعم بالعناصر التكرارية والمنسقة ذات الواجهة، يفضل استخراجها وادخالها ككلاس `StatelessWidget` خاص.\n\nاستيعابه للخصائص المدرجة يساعد في مرونة وكتابته بمكان واحد.',
        callout: 'ملحوظة هامة: لا تقم بإعماء أجزائك عبر الاستدعاءات الوظيفية، كتابتك وتكوينك بكلاسات (StatelessWidget) أفضل بمراحل لمحركات وعروض وفهرسة فلاتر.',
        objectives: ['تطبيق النهج (لا تكرر الكود) DRY', 'عزل الواجهة كلاسيا وانشاء الـ Widgets جديدة'],
        durationMinutes: 6,
        quiz: [{
          question: 'לما يجب تفضيل وتخصيص إنشاء واجهة متكررة لـ StatelessWidget عوضاً عن الوظائف المعينة التلقائية؟',
          options: ['يتطلب استخدام سطور برمجية أقل', 'يتوائم بضخامة وتفاعلية أكثر بمسار الفهرسة ومحركات الـ element tree العرضية', 'لا تتخذ دوال المساعدة خصائص دالة', 'يمكن إدراج خاصية وإجراء hot reload لتلك الأيقونة فقط'],
          correctAnswerIndex: 1,
          explanation: 'تمتلك المستخرجات الُمدرجة للـ widgets خصائصها التوسعية BuildContext وتسهيلات مسار البناء المتكرر.'
        }]
      },
      {
        id: 'theme-basics',
        title: 'أساسيات الثيم Theme',
        description: 'لا تعطل وقتك بتكرار الألوان للمكونات وتضمينها يدويًا. اقتني خواص الـ `ThemeData`!\n\nبتعريف الـ `ThemeData` للـ `MaterialApp`، ستتوافق كافة العناصر والتقاربات، خطوطك، وحتى استراتيجيات وحواف الأزرار التلقائية معها.',
        callout: 'هل تعلم؟ يقبل فلاتر دعامة ألوان الاضاءة والسواد الدامس معتمدة عبر theme و darkTheme بالاستناد مباشرةً من MaterialApp!',
        objectives: ['فهم الوراثة والانحدار من رأس قالب الثيم'],
        durationMinutes: 5,
        quiz: [{
          question: 'كيف تعرف المكونات ألوانها المعمول بها، لكي تصاغ تلقائياً؟',
          options: ['يتقمص ويسترد الهيئة من نظامك OS', 'يتحصل عليها متدرجا بتصاعد وبإيعاز مرجع وأقرب Theme مسند', 'يستخدم القوة الدافعة والإجبارية المعيارية للرموز المتكررة', 'يتوصل به لاستنساخه واستخراجه من عبر الانترنت'],
          correctAnswerIndex: 1,
          explanation: 'ينحدِر الـ Theme متوارثاً من شجرة الـ context من الأقرب، متصلا أخيراً نحو MaterialApp.'
        }]
      },
      {
        id: 'async-basics',
        title: 'أساسيات الـ Async',
        description: 'يحدث لدارت انتظارها المطول كاستحصال البيانات الخلوية للشبكات أو عمليات القراءة المفرطة.\n\nكلاسات الدارت `Future` والاستدعاء المؤقت `async/await` تدفع بإمكانية الانتظار، لا إعطال وقطع سلاسة التطبيق وحركة واجهة المستخدم.',
        callout: 'وقت القياس: عندما تسجل طلبية لوجبة مطعم لا تقف متربصاً بالمطبخ، تحمل مستقبلاً الانتظار الآلي (`Future`) للمنتج وتتحرك بكل راحة حتى تستلم تنبيهاً.',
        objectives: ['تلمس المفاهيم الخاصة بالـ Futures', 'فهم جملة واستدعاءات async/await وخصائصها'],
        durationMinutes: 6,
        quiz: [{
          question: 'ما هو الهدف من Future في دارت؟',
          options: ['ويدجت يقوم بإجراء عرض لاحق', 'كائن يمثل توقيت استرجاع قيمة أو حتى خطأ سيحصل لا محالة ولكن بوقت آجلاً مستقبلًا', 'طلب متكامل لمسار شبكة', 'مؤقت'],
          correctAnswerIndex: 1,
          explanation: 'يمثل Future حامل البيانات الآتية، إشارة تمثيل لعملية مستقبلية.'
        }]
      },
      {
        id: 'future-builder',
        title: 'ويدجت FutureBuilder',
        description: 'كيف يظهر الانتظار والتوقف لجلاب وتدفق الواجهة؟ استخدام ويدجت الـ `FutureBuilder`!\n\nيوجه للتعامل المبتلى للـ `Future` لإنصافك بـ `snapshot` للوضع المرن (`waiting`, `hasData`, `hasError`) لترسم به الرد المناسب.',
        callout: 'نصيحة: أعرض الخطأ واستدعي مكونات الأخطاء إذا حصل الـ snapshot.hasError على حق وصدق، لا تترك المستخدم مكلوم في شاشاته الصامتة.',
        objectives: ['بناء استجابة وتدفق لواجهات العمليات الموزعة والمتأخرة'],
        durationMinutes: 6,
        quiz: [{
          question: 'متى تتصف الـ snapshot.connectionState بـ ConnectionState.waiting، فما الواجب إرجاعه من القالب؟',
          options: ['مكان خالي القوام (Empty)', 'استرجاع البيانات المسدلة', 'إرجاع وتكوين لـ CircularProgressIndicator أو واجهات انتظار مخصصة', 'معلومات وتنبيه بالخطأ'],
          correctAnswerIndex: 2,
          explanation: 'طوال الوقت الخاص بالانتظار، يقتضي أن تدون بيانات مرئية وتلمح للمستخدمين بان المعالجة بالمرصاد.'
        }]
      }
    ]
  },
  {
    id: 'state-management',
    title: '12. إدارة الحالة',
    description: 'تعلّم كيف يشارك Flutter البيانات ويحدّثها عبر شجرة الـ widgets.',
    lessons: [
      {
        id: 'inherited-widget',
        title: 'InheritedWidget',
        description: 'تعد InheritedWidget الآلية المدمجة في Flutter لتمرير البيانات إلى أسفل شجرة الـ widgets بدون تمريرها يدويًا عبر الـ constructors. وهي الأساس الذي بُنيت عليه حلول مثل Provider وRiverpod.',
        callout: 'خطأ شائع: كثير من المبتدئين يمررون البيانات عبر 10 طبقات من الـ constructors. تحل InheritedWidget هذه المشكلة بجعل البيانات متاحة لأي عنصر ابن.',
        objectives: [
          'فهم مشكلة مشاركة البيانات داخل شجرة الـ widgets',
          'رؤية كيف تكشف InheritedWidget البيانات للعناصر الأبناء',
          'التعرف عليها كأساس لمعظم حلول إدارة الحالة',
        ],
        durationMinutes: 4,
        quiz: [
          {
            question: 'ما الدالة التي يستدعيها الـ widget لقراءة البيانات من InheritedWidget؟',
            options: [
              'setState()',
              'context.dependOnInheritedWidgetOfExactType() أو دالة of()',
              'Navigator.push()',
              'buildWhen()',
            ],
            correctAnswerIndex: 1,
            explanation: 'عادة تتم قراءة بيانات InheritedWidget عبر context.dependOnInheritedWidgetOfExactType() مباشرة أو من خلال دالة ثابتة من نوع of(context).',
          },
        ],
      },
      {
        id: 'provider-basics',
        title: 'Provider (إدارة الحالة)',
        description: 'يعد Provider أشهر حزمة لإدارة الحالة في Flutter. فهو يغلف InheritedWidget داخل واجهة أبسط بكثير. يحتفظ كلاس ChangeNotifier بالحالة ويستدعي notifyListeners() عند تغيرها. بعدها تقوم Consumer أو context.watch() بإعادة بناء الواجهة تلقائيًا.',
        callout: 'Provider مشهور جدًا لدرجة أن فريق Flutter أوصى به. وفي أغلب التطبيقات يكون الخيار الصحيح قبل الانتقال إلى حلول أعقد.',
        objectives: [
          'إنشاء كلاس ChangeNotifier',
          'تغليف التطبيق داخل ChangeNotifierProvider',
          'قراءة الحالة باستخدام context.watch() وتنفيذ التغييرات عبر context.read()',
        ],
        durationMinutes: 5,
        quiz: [
          {
            question: 'ما الدالة التي تؤدي إلى إعادة بناء الواجهة في Provider؟',
            options: ['refresh()', 'notifyListeners()', 'setState()', 'rebuildNow()'],
            correctAnswerIndex: 1,
            explanation: 'يقوم ChangeNotifier بإخبار الـ widgets المستمعة بإعادة البناء عبر استدعاء notifyListeners().',
          },
          {
            question: 'ما الـ widget التي تراقب الـ provider وتعيد البناء عند تغيره؟',
            options: ['Builder', 'Consumer', 'Expanded', 'FutureBuilder'],
            correctAnswerIndex: 1,
            explanation: 'تستمع Consumer إلى الـ provider وتعيد تنفيذ builder كلما تغيرت الحالة.',
          },
        ],
      },
      {
        id: 'value-notifier',
        title: 'ValueNotifier و ValueListenableBuilder',
        description: 'يعد ValueNotifier بديل Flutter الخفيف لإدارة الحالة الكاملة. فهو يلف قيمة واحدة فقط ويخطر المستمعين عندما تتغير. أما ValueListenableBuilder فيعيد بناء الـ widgets التي تحتاج فعلًا إلى التحديث، ولذلك فهو فعال جدًا.',
        callout: 'استخدم ValueNotifier عندما تحتاج إلى تتبع قيمة بسيطة واحدة فقط مثل عداد أو مفتاح تشغيل أو تبويب محدد. فهو يتجنب تعقيد كلاس ChangeNotifier كامل.',
        durationMinutes: 3,
        quiz: [
          {
            question: 'ما الكلاس التي تستخدمها للاستماع إلى ValueNotifier داخل شجرة الـ widgets؟',
            options: ['StreamBuilder', 'ValueListenableBuilder', 'ProviderScope', 'AnimatedBuilder'],
            correctAnswerIndex: 1,
            explanation: 'يقوم ValueListenableBuilder بإعادة البناء كلما تغيرت قيمة ValueNotifier المرتبطة به.',
          },
        ],
      },
    ],
  },
  {
    id: 'dart-advanced',
    title: '13. تعمق في Dart',
    description: 'قوِّ أساسيات Dart لديك حتى تصبح أنماط Flutter المتقدمة أكثر وضوحًا.',
    lessons: [
      {
        id: 'null-safety',
        title: 'Null Safety',
        description: 'تعني Null Safety أن Dart تضمن أن المتغير لا يمكن أن يكون null إلا إذا صرحت بذلك صراحة. وهذا يزيل فئة كاملة من الأعطال أثناء التشغيل. استخدم ? لتعريف الأنواع القابلة لـ null و ! لفرض عدم null و ?? لقيم بديلة و late للمتغيرات التي تهيأ لاحقًا.',
        callout: 'الخطأ الشهير "Null check operator used on a null value" يعني غالبًا أنك استخدمت ! على قيمة كانت null فعلًا. فضّل عادة ?? أو ?. بدلًا من !.',
        objectives: [
          'فهم الفرق بين الأنواع القابلة وغير القابلة لـ null',
          'استخدام ?, !, ??, و late بشكل صحيح',
          'منع أعطال المؤشرات الفارغة',
        ],
        durationMinutes: 4,
        quiz: [
          {
            question: 'ما العامل الذي يوفر قيمة بديلة عندما تكون القيمة null؟',
            options: ['?.', '??', '!', 'as'],
            correctAnswerIndex: 1,
            explanation: 'يعيد العامل ?? القيمة الموجودة على اليمين عندما تكون الجهة اليسرى null.',
          },
          {
            question: 'ما وظيفة الكلمة المفتاحية late؟',
            options: [
              'تجعل المتغير قابلًا لـ null دائمًا',
              'تعلن عن متغير غير قابل لـ null سيتم تهيئته قبل الاستخدام',
              'تجبر المتغير على إعادة البناء',
              'تنشئ متغيرًا غير متزامن',
            ],
            correctAnswerIndex: 1,
            explanation: 'تخبر late لغة Dart بأن المتغير سيتم إسناده لاحقًا ولكن قبل قراءته بالتأكيد.',
          },
        ],
      },
      {
        id: 'streams-basics',
        title: 'Streams و StreamBuilder',
        description: 'يعطيك Future قيمة واحدة في المستقبل. أما Stream فيعطيك عدة قيم مع مرور الوقت، مثل سير متحرك للبيانات. استخدم StreamBuilder في Flutter لإعادة بناء الواجهة في كل مرة يصل حدث جديد من الـ stream.',
        callout: 'أمثلة حقيقية على الـ streams: رسائل WebSocket ولقطات Firestore وبيانات الحساسات أو حتى مؤقت يطلق حدثًا كل ثانية.',
        objectives: [
          'فهم الفرق بين Future و Stream',
          'إنشاء Stream دورية بسيطة',
          'استخدام StreamBuilder لعرض بيانات حية',
        ],
        durationMinutes: 4,
        quiz: [
          {
            question: 'ما الـ widget التي تعيد بناء الواجهة كلما أطلق الـ Stream قيمة جديدة؟',
            options: ['FutureBuilder', 'ValueListenableBuilder', 'StreamBuilder', 'AnimatedBuilder'],
            correctAnswerIndex: 2,
            explanation: 'تستمع StreamBuilder إلى أحداث الـ stream وتعيد البناء عند وصول كل قيمة جديدة.',
          },
        ],
      },
      {
        id: 'dart-mixins',
        title: 'Mixins',
        description: 'تسمح لك الـ Mixin بإعادة استخدام دوال كلاس داخل عدة كلاسات أخرى دون الوراثة التقليدية. استخدم الكلمة المفتاحية with. تحل الـ mixins مشكلة مشاركة السلوك بين كلاسات لا تشترك في أب واحد.',
        callout: 'يستخدم Flutter الـ mixins داخليًا في كل مكان. ومن أشهر ما ستقابله في الرسوم المتحركة SingleTickerProviderStateMixin. فهم الـ mixins يفتح لك الباب لأنماط Flutter المتقدمة.',
        durationMinutes: 3,
        quiz: [
          {
            question: 'ما الكلمة المفتاحية التي تطبق mixin على كلاس؟',
            options: ['extends', 'implements', 'with', 'mixes'],
            correctAnswerIndex: 2,
            explanation: 'يتم تطبيق الـ mixin على الكلاس في Dart باستخدام الكلمة المفتاحية with.',
          },
        ],
      },
    ],
  },
  {
    id: 'animations',
    title: '14. الرسوم المتحركة',
    description: 'انتقل من واجهات ثابتة إلى تجارب Flutter أكثر سلاسة وحيوية.',
    lessons: [
      {
        id: 'animated-container',
        title: 'AnimatedContainer',
        description: 'يعد AnimatedContainer أسهل طريقة لصنع حركة في Flutter. فهو يعمل مثل Container العادي تمامًا، لكن عند تغير خصائصه مثل الحجم أو اللون أو نصف قطر الحواف يقوم بتحريك الانتقال تلقائيًا باستخدام مدة ومنحنى تحددهما أنت.',
        callout: 'يقوم AnimatedContainer بالتحريك فقط بين حالتين معروفتين. أما الحركات الأكثر تعقيدًا أو التكرارية أو الفيزيائية فتحتاج إلى AnimationController.',
        objectives: [
          'استخدام AnimatedContainer لتحريك تغير الخصائص',
          'التحكم في مدة الحركة والمنحنى',
          'فهم الفرق بين الحركات الضمنية والصريحة',
        ],
        durationMinutes: 3,
        quiz: [
          {
            question: 'ما الخاصيتان اللتان تتحكمان في كيفية حركة AnimatedContainer؟',
            options: ['height و width', 'duration و curve', 'child و alignment', 'padding و margin'],
            correctAnswerIndex: 1,
            explanation: 'تحدد duration مدة الحركة، بينما يحدد curve أسلوب التسارع والتباطؤ.',
          },
        ],
      },
      {
        id: 'animation-controller',
        title: 'AnimationController',
        description: 'يمنحك AnimationController تحكمًا كاملًا ودقيقًا في الحركات. أنت تحدد المدة ثم تقود الحركة إلى الأمام أو الخلف أو تجعلها تتكرر. استخدم Tween لربط قيمة الحركة 0.0-1.0 بنطاق مثل 0.0-300.0 للحجم أو Color.red-Color.blue للألوان.',
        callout: 'احرص دائمًا على استدعاء animationController.dispose() داخل dispose() الخاصة بالـ State. نسيان ذلك يؤدي إلى تسربات في الذاكرة.',
        objectives: [
          'إنشاء AnimationController مع Tween',
          'استخدام forward() و reverse() و repeat()',
          'تنظيف المتحكمات بشكل صحيح',
        ],
        durationMinutes: 5,
        quiz: [
          {
            question: 'ما الـ mixin التي يجب أن تستخدمها State لتوفير vsync لـ AnimationController؟',
            options: [
              'AutomaticKeepAliveClientMixin',
              'SingleTickerProviderStateMixin',
              'ChangeNotifier',
              'InheritedWidget',
            ],
            correctAnswerIndex: 1,
            explanation: 'تقوم SingleTickerProviderStateMixin بتوفير الـ vsync الذي يحتاجه AnimationController.',
          },
          {
            question: 'ما الدالة التي تبدأ تشغيل الحركة إلى الأمام؟',
            options: ['play()', 'begin()', 'forward()', 'resume()'],
            correctAnswerIndex: 2,
            explanation: 'يبدأ AnimationController الحركة نحو النهاية عند استدعاء forward().',
          },
        ],
      },
      {
        id: 'hero-animation',
        title: 'Hero Animation',
        description: 'تنشئ Hero animation انتقالًا بصريًا سلسًا لعنصر بين شاشتين. تقوم بتغليف نفس العنصر على الشاشتين داخل Hero widget وتعطيهما نفس الـ tag. بعدها يقوم Flutter بتحريك العنصر تلقائيًا من شاشة إلى أخرى.',
        callout: 'يجب أن يكون الـ tag فريدًا لكل Hero داخل الشاشة الواحدة. إذا وُجد Heroان بنفس الـ tag على نفس الشاشة فسيرمي Flutter خطأ.',
        objectives: [
          'تغليف عنصر بـ Hero في الشاشتين',
          'فهم نظام مطابقة الـ tag',
          'إنشاء انتقالات سلسة بين الشاشات',
        ],
        durationMinutes: 3,
        quiz: [
          {
            question: 'ما الخاصية التي يجب أن تتطابق بين Hero في الشاشتين حتى تعمل الحركة؟',
            options: ['curve', 'duration', 'tag', 'child'],
            correctAnswerIndex: 2,
            explanation: 'يطابق Flutter بين Hero widgets عبر المسارات بمقارنة قيمة tag.',
          },
        ],
      },
    ],
  },
  {
    id: 'data-backend',
    title: '15. البيانات والخلفية',
    description: 'اربط واجهات Flutter بالـ APIs والتخزين المحلي والبيانات المنظمة.',
    lessons: [
      {
        id: 'json-serialization',
        title: 'JSON Serialization',
        description: 'تعيد الـ APIs نص JSON. تقوم jsonDecode() في Dart بتحويله إلى Map<String, dynamic>. بعد ذلك تنشئ عادة كلاس Dart يحتوي على factory constructor باسم fromJson() لتحويل الخريطة إلى كائن typed بشكل آمن.',
        callout: 'خطأ شائع: الوصول إلى مفتاح JSON غير موجود يعيد null، وهذا قد يسبب تعطلًا إذا كان المتغير غير قابل لـ null. تحقق دائمًا من شكل JSON أو استخدم الوصول الآمن مع ??.',
        objectives: [
          'استخدام jsonDecode() لتحليل نص JSON',
          'إنشاء factory constructor باسم fromJson()',
          'الوصول الآمن إلى الحقول المتداخلة',
        ],
        durationMinutes: 4,
        quiz: [
          {
            question: 'ما دالة Dart التي تحول نص JSON إلى Map؟',
            options: ['jsonParse', 'jsonDecode', 'mapDecode', 'decodeJsonMap'],
            correctAnswerIndex: 1,
            explanation: 'تقوم jsonDecode() بتحليل نص JSON إلى مجموعات Dart مثل Map<String, dynamic>.',
          },
          {
            question: 'ما نوع الكائن JSON بعد فك ترميزه في Dart؟',
            options: ['Map<int, String>', 'List<dynamic>', 'Map<String, dynamic>', 'Object<String>'],
            correctAnswerIndex: 2,
            explanation: 'يتحول كائن JSON بعد فك ترميزه إلى Map<String, dynamic> في Dart.',
          },
        ],
      },
      {
        id: 'http-basics',
        title: 'طلبات HTTP باستخدام حزمة http',
        description: 'تعد حزمة http الطريقة القياسية في Flutter لتنفيذ طلبات الشبكة. تعيد http.get() قيمة Future<Response>. تحقق من response.statusCode == 200 عند النجاح، ثم مرر response.body إلى jsonDecode(). تعامل دائمًا مع حالات التحميل والخطأ.',
        callout: 'لا تنفذ طلبات http مباشرة داخل build() أبدًا. ضعها دائمًا في initState() أو معالج زر أو داخل service class منفصلة.',
        objectives: [
          'تنفيذ طلب GET باستخدام http.get()',
          'التحقق من رمز الحالة',
          'تحليل نص الاستجابة كـ JSON',
        ],
        durationMinutes: 4,
        quiz: [
          {
            question: 'ما رمز الحالة الذي يعني أن استجابة HTTP ناجحة؟',
            options: ['100', '200', '301', '500'],
            correctAnswerIndex: 1,
            explanation: 'يعني الرمز 200 أن الخادم أعاد الاستجابة المطلوبة بنجاح.',
          },
          {
            question: 'ما الخاصية التي تحتوي نص الاستجابة من استدعاء http.get()؟',
            options: ['response.text', 'response.payload', 'response.body', 'response.contentText'],
            correctAnswerIndex: 2,
            explanation: 'يكون نص الاستجابة الخام متاحًا عبر الخاصية response.body.',
          },
        ],
      },
      {
        id: 'shared-preferences',
        title: 'SharedPreferences',
        description: 'تتيح لك SharedPreferences حفظ كميات صغيرة من بيانات المفتاح والقيمة محليًا على الجهاز. وهي مثالية لحفظ إعدادات المستخدم أو التوكنات أو حالة الـ onboarding. تبقى البيانات محفوظة بعد إعادة تشغيل التطبيق.',
        callout: 'ليست SharedPreferences قاعدة بيانات. لا تخزن فيها بيانات كبيرة أو قوائم كائنات أو بيانات حساسة مثل كلمات المرور. استخدم Hive أو SQLite للبيانات المحلية المنظمة.',
        objectives: [
          'حفظ وقراءة القيم باستخدام SharedPreferences',
          'فهم التهيئة غير المتزامنة عبر getInstance()',
          'معرفة متى تستخدم SharedPreferences ومتى تحتاج إلى قاعدة بيانات محلية',
        ],
        durationMinutes: 3,
        quiz: [
          {
            question: 'ما الدالة التي تعيد كائن SharedPreferences؟',
            options: [
              'SharedPreferences.open()',
              'SharedPreferences.create()',
              'SharedPreferences.getInstance()',
              'SharedPreferences.load()',
            ],
            correctAnswerIndex: 2,
            explanation: 'تعيد SharedPreferences.getInstance() كائن التخزين المحلي غير المتزامن.',
          },
        ],
      },
    ],
  },
  {
    id: 'testing-debugging',
    title: '16. الاختبار وتصحيح الأخطاء',
    description: 'تعلّم كيف تتحقق من سلوك التطبيق، وتلتقط الأخطاء مبكرًا، وتفحص تخطيطات Flutter بثقة.',
    lessons: [
      {
        id: 'widget-testing',
        title: 'Widget Testing',
        description: 'تشغّل اختبارات الواجهات في Flutter داخل بيئة اختبار خفيفة. يمكنك بناء widget، والضغط على الأزرار، وإدخال النص، ثم التحقق مما يظهر على الشاشة. وهي أسرع من اختبارات التكامل الكاملة ومثالية للتحقق من سلوك الواجهة.',
        callout: 'لا تعمل اختبارات الواجهات على جهاز حقيقي. وهذا يجعلها سريعة جدًا، لكن السلوكيات المرتبطة بالمنصة قد تحتاج أحيانًا إلى اختبارات تكامل.',
        objectives: [
          'استخدام testWidgets() لتعريف اختبار واجهة',
          'التفاعل مع الواجهة باستخدام WidgetTester',
          'التحقق من المخرجات الظاهرة باستخدام expect() ووسائل البحث',
        ],
        durationMinutes: 4,
        quiz: [
          {
            question: 'ما الدالة في Flutter التي تُستخدم لتعريف اختبار واجهة widget؟',
            options: ['testWidgets', 'runWidgetTest', 'widgetTest', 'pumpWidget'],
            correctAnswerIndex: 0,
            explanation: 'تعد testWidgets() الدالة القياسية في Flutter لبناء الواجهات والتفاعل معها داخل الاختبارات.',
          },
          {
            question: 'ما الكائن الذي يضغط الأزرار ويدخل النص ويشغّل frames داخل اختبار الواجهة؟',
            options: ['BuildContext', 'WidgetTester', 'AnimationController', 'InheritedWidget'],
            correctAnswerIndex: 1,
            explanation: 'يوفر Flutter كائن WidgetTester لقيادة شجرة الواجهة أثناء الاختبار.',
          },
        ],
      },
      {
        id: 'unit-testing',
        title: 'Unit Testing',
        description: 'تتحقق اختبارات الوحدات من منطق Dart الصافي دون بناء أي واجهة. وهي أسرع طريقة لاكتشاف أخطاء الحسابات أو التحليل أو منطق الأعمال لأنها تركز على دالة أو كلاس واحد في كل مرة.',
        callout: 'إذا كان من الصعب اختبار منطق الأعمال باختبار وحدة، فغالبًا هذا يعني أن كثيرًا من المنطق محبوس داخل widgets بدلًا من كونه في كائنات Dart مستقلة.',
        objectives: [
          'اختبار دالة Dart مستقلة عن الواجهة',
          'مقارنة القيم المتوقعة والفعلية باستخدام expect()',
          'فصل منطق الأعمال عن كود الواجهة',
        ],
        durationMinutes: 3,
        quiz: [
          {
            question: 'ما الدالة التي تستخدمها في اختبارات Dart لمقارنة القيمة الفعلية بالقيمة المتوقعة؟',
            options: ['assertValue', 'expect', 'verify', 'compare'],
            correctAnswerIndex: 1,
            explanation: 'تعد expect() دالة التحقق الأساسية المستخدمة في اختبارات Dart وFlutter.',
          },
        ],
      },
      {
        id: 'flutter-inspector',
        title: 'Flutter Inspector',
        description: 'يُعد Flutter Inspector أداة التصحيح البصرية داخل DevTools. فهو يتيح لك فحص شجرة الـ widgets وفهم قيود التخطيط وإظهار الـ padding وتحديد أي widget مسؤولة عن المساحة التي تراها على الشاشة.',
        callout: 'عندما يبدو التخطيط خاطئًا، لا تعتمد على التخمين. افتح Inspector ودع Flutter يريك الشجرة والمسافات والقيود الفعلية.',
        objectives: [
          'فحص شجرة الـ widgets بصريًا',
          'إظهار الـ padding وقيود التخطيط',
          'استخدام وضع التحديد لمعرفة الـ widget المسببة للمشكلة',
        ],
        durationMinutes: 4,
        quiz: [
          {
            question: 'ما الميزة في DevTools التي تعرض شجرة الـ widgets والـ padding وتفاصيل التخطيط في شاشة Flutter الحالية؟',
            options: ['Widget Catalog', 'Flutter Inspector', 'Hot Reload', 'Pub Manager'],
            correctAnswerIndex: 1,
            explanation: 'Flutter Inspector هو الجزء في DevTools المخصص لتصحيح الواجهات بصريًا وفحص شجرة العناصر.',
          },
        ],
      },
    ],
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
