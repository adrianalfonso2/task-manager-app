# How to Replace the Logo Image

The current Task Manager app is using a placeholder logo. To use your custom logo, follow these steps:

## Option 1: Using Expo File System (Recommended)

1. Make sure your logo is a valid PNG file with transparent background for best results
2. Resize your logo to around 200x200 pixels for optimal display
3. Save your logo as "task-manager-logo.png"
4. Replace the file at `assets/images/task-manager-logo.png` with your file

## Option 2: Creating through code editor

If you're using a code editor like VS Code:

1. Delete the current placeholder file at `assets/images/task-manager-logo.png`
2. Right-click on the `assets/images` folder and select "Upload files"
3. Select your logo file and make sure to name it "task-manager-logo.png"

## Option 3: Command Line

If you're comfortable with the command line:

```bash
# Navigate to your project directory
cd path/to/task-manager-app

# Replace the logo file with your own
cp /path/to/your/logo.png assets/images/task-manager-logo.png
```

## After Replacing the Logo

After replacing the logo, restart your Expo development server:

```bash
npx expo start --clear
```

Your custom logo should now appear throughout the app, including:
- In the main header
- As the tab bar icon
- On the splash screen
- As the app icon on mobile devices 