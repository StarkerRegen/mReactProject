import { Client } from "@notionhq/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [pageData, setPageData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = tabs[0].url;
        const title = tabs[0].title;
        setPageData({ url, title });
      });
  }, []);

  async function saveBookmarkToNotion(bookmark) {
    const notion = new Client({
      auth: process.env.NEXT_PUBLIC_NOTION_API_TOKEN,
    });
    try {
      await notion.pages.create({
        parent: {
          database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID,
        },
        properties: {
          Title: {
            title: [
              {
                text: {
                  content: bookmark.title,
                },
              },
            ],
          },
          URL: {
            url: bookmark.url,
          },
          Tags: {
            multi_select: bookmark.tags,
          },
          Notes: {
            rich_text: [
              {
                text: {
                  content: bookmark.notes || "-",
                },
              },
            ],
          },
        },
      });
      setPageData({});
      return true;
    } catch (error) {
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);

    const data = new FormData(e.target);
    const bookmark = Object.fromEntries(data.entries());

    bookmark.tags = bookmark.tags
      .split(",")
      .filter((tag) => tag.trim().length !== 0)
      .map((tag) => ({
        name: tag.trim(),
      }));

    const result = await saveBookmarkToNotion(bookmark);

    if (result) {
      setIsSaved(true);
    } else {
      setIsSaving(false);
    }
  }

  return (
    <div>
      {isSaved ? (
        <span>Saved</span>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="segment">
            <h1>Save a bookmark</h1>
          </div>
          <label>
            <input
              name="title"
              type="text"
              defaultValue={pageData.title}
              placeholder="Title"
              required
            />
          </label>
          <label>
            <input
              name="url"
              type="url"
              defaultValue={pageData.url}
              placeholder="URL"
              title={pageData.url}
              required
            />
          </label>
          <label>
            <input name="languages" type="text" placeholder="Languages" />
            <small>Separate Languages with Commas</small>
          </label>
          <label>
            <input name="tags" type="text" placeholder="Tags" />
            <small>Separate Tags with Commas</small>
          </label>
          <label>
            <input name="notes" as="textarea" rows={3} placeholder="Notes" />
          </label>
          <button className="red" type="submit" disabled={isSaving}>
            {isSaving ? <span>Saving</span> : <span>Save</span>}
          </button>
        </form>
      )}
      );
    </div>
  );
}
