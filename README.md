# Tokenized Input

A widget for entering and editing strings that contain "tokens", designed to be replaced at runtime with real values - think mail-merge.

Here's an example of a tokenized string:

```php
Dear [[FORENAME]] [[SURNAME]]. Your order number [[ORDER]] is available for collection.
``` 

This widget makes entering such strings easier and slicker.

### Defining Tokens

A token is made of of three parts:

1. The `name` is what gets embedded into the underlying string.
2. The `label`, which is optional, is what gets displayed in the editor.
3. The `example`, also optional, is used in the preview.

For example, take the following:

```php
{
    name: "forename",
    label: "First name",
    example: "Joe"
}
```

This gets displayed like so:

> Dear <span style="background:#eee;border:#ddd;border-radius:0.25rem;padding:0.1rem;font-size:1rem;">Joe</span>, this is a message.

The underlying string looks like this:

```
Dear [[FORENAME]], this is a message.
```

The preview looks like this:

> Dear Joe, this is a message.

It's recommended that you provide the available tokens via the `tokens` property; this simply takes an array of objects that look like the one above.

You'll need to provide the available tokens in order to use the insert menu; however you can enter tokens that haven't been pre-defined by typing them out.

### Handling Undefined Tokens

As stated above, you can enter undefined tokens using the keyboard, but the component provides a few options for handling this.

You can opt to show that the token is invalid, which it does by adding a CSS class.

Setting the component prop `allowUndefinedTokens` to `false` prevents the user from entering an undefined token. 