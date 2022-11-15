import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

function html(url: URL) {
  const repository = `https://github.com/${
    Deno.env.get("GITHUB_USERNAME")
  }${url.pathname}`;
  const packageUrl = url.host + url.pathname;
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="go-import" content="${packageUrl} git ${repository}">
        <meta name="go-source" content="${packageUrl} ${repository} ${repository}/tree/main{/dir} ${repository}/blob/main{/dir}/{file}#L{line}">
        <title>${url.pathname}</title>
    </head>
    <body>
        <pre>Redirecting...</pre>
        <script>document.onreadystatechange = () => (document.readyState == "complete" ? window.location.replace("${repository}") : null)</script>
    </body>
    </html>
  `;
}

serve((req) => {
  const url = new URL(req.url);
  return new Response(html(url), {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
});
