// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

let insertCommentBlock = function () {
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const position = editor.selection.start;
		const comment = `/*
|--------------------------------------------------------------------------
| Comment title
|--------------------------------------------------------------------------
|
| Comment description.
|
*/`;

		editor.edit(editBuilder => {
			editBuilder.insert(position, comment);
			vscode.window.showInformationMessage('Comment inserted!');

		}).then(() => {
			// Calculate the range for the Comment Title
			// starts on line 2 @ column 2
			const titleStartPosition = position.translate(2, 2); // Adjust as needed

			// doesnt move line, and goes forward 15 columns
			const titleEndPosition = titleStartPosition.translate(0, 15); // Adjust as needed

			// Select the Comment Title
			editor.selection = new vscode.Selection(titleStartPosition, titleEndPosition);
		});
	} else {
		vscode.window.showInformationMessage('No active editor');
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "comments-generator" is now active!');

	let commentBlockCommand = vscode.commands.registerCommand('comments-generator.insertCommentBlock', function () {
		insertCommentBlock();
	});

	context.subscriptions.push(disposable, commentBlockCommand);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
