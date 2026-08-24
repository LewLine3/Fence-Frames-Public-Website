import http.server
import json
import os
import sys
import datetime

PORT = 8080
INBOX_FILE = "founder-feedback-inbox.json"

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path == "/api/dispatch-feedback":
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode("utf-8"))
                data["received_at"] = datetime.datetime.now().isoformat()
                
                inbox = []
                if os.path.exists(INBOX_FILE):
                    try:
                        with open(INBOX_FILE, "r", encoding="utf-8") as f:
                            inbox = json.load(f)
                    except:
                        inbox = []
                
                inbox.append(data)
                
                with open(INBOX_FILE, "w", encoding="utf-8") as f:
                    json.dump(inbox, f, indent=2)
                
                print(f"[FEEDBACK INBOX] Received request from page {data.get('pageId')} targeted to chat {data.get('targetChat')}")
                
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": True, "count": len(inbox), "received": data}).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == "__main__":
    server = http.server.HTTPServer(("0.0.0.0", PORT), Handler)
    print(f"Serving HTTP on port {PORT} with feedback dispatch endpoint...")
    server.serve_forever()
