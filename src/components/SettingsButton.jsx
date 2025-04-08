import { useState, useEffect } from "react";

export default function SettingsButton() {

  return (
    <div className="flex justify-end p-2">
      <button className="px-4 py-2 bg-gray-700 rounded-md flex-shrink-0">
      ⚙ Settings
      </button>
    </div>
  );
}
