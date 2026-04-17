export const newSectionsEn = [
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
          correctIndex: 1,
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
          correctIndex: 2,
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
          correctIndex: 1,
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
          correctIndex: 2,
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
          correctIndex: 1,
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
          correctIndex: 3,
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
          correctIndex: 1,
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
          correctIndex: 0,
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
          correctIndex: 2,
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
          correctIndex: 1,
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
          correctIndex: 2,
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
          correctIndex: 1,
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
          correctIndex: 2,
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
          correctIndex: 1,
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
          correctIndex: 2,
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
          correctIndex: 1,
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
          correctIndex: 1,
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
          correctIndex: 1,
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
          correctIndex: 1,
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
          correctIndex: 2,
          explanation: 'While waiting, you must provide the user visual feedback that a background process is resolving.'
        }]
      }
    ]
  }
];
