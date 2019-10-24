## Develop

First clone:

```sh
git clone https://github.com/ratson/refined-lihkg
cd refined-lihkg
yarn
```

When working on the extension or checking out branches, use this to have it constantly build your changes:

```sh
yarn watch # Listen for file changes and automatically rebuild
```

Then load or reload it into the browser to see the changes (this does not happen automatically).

## Loading into the browser

Once built, load it in the browser of your choice:

<table>
	<tr>
		<th>Chrome</th>
		<th>Firefox</th>
	</tr>
	<tr>
		<td width="50%" valign="top">
			<ol>
				<li>Open <code>chrome://extensions</code>;
				<li>Check the <strong>Developer mode</strong> checkbox;
				<li>Click on the <strong>Load unpacked extension</strong> button;
				<li>Select the folder <code>refined-lihkg/distribution</code>.
			</ol>
		</td>
		<td width="50%" valign="top">
			<ol>
				<li>Open <code>about:debugging#addons</code>;
				<li>Click on the <strong>Load Temporary Add-on</strong> button;
				<li>Select the file <code>refined-lihkg/distribution/manifest.json</code>.
			</ol>
			Or you can use run this command to have Firefox automatically load and reload it through <a href="https://developer.mozilla.org/en-US/Add-ons/WebExtensions/web-ext_command_reference#web-ext_run"><code>web-ext run</code></a>:</p>
			<pre>yarn watch-firefox</pre>
		</td>
	</tr>
</table>
