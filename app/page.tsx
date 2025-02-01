"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSiteContext } from "@/store/apiSlice";
import type { RootState, AppDispatch } from "@/store/store";
import Link from "next/link";

export default function SiteInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const { siteContext, loading, error } = useSelector(
    (state: RootState) => state.api
  );

  useEffect(() => {
    dispatch(fetchSiteContext());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        <h2>Error:</h2>
        <p>{error}</p>
        <p>Please check your API credentials and network connection.</p>
      </div>
    );
  }

  if (!siteContext) {
    return <div>No site context available.</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{siteContext.site_title}</h1>
      <h2 className="text-2xl font-semibold">{siteContext.site_header}</h2>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Available Apps:</h3>
        <ul className="space-y-4">
          {siteContext.available_apps.map((app) => (
            <li key={app.app_url} className="bg-white shadow rounded-lg p-4">
              <h4 className="text-lg font-semibold">{app.name}</h4>
              <p className="text-gray-600">Label: {app.app_label}</p>
              <p className="text-gray-600">URL: {app.app_url}</p>
              {app.has_module_perms && (
                <p className="text-green-600">Has module permissions</p>
              )}
              {app.models && app.models.length > 0 && (
                <div className="mt-2">
                  <h5 className="text-md font-semibold">Models:</h5>
                  <ul className="list-disc pl-5">
                    {app.models.map((model) => (
                      <li key={model.object_name}>
                        <Link
                          href={`/${model.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="text-blue-500 hover:underline"
                        >
                          {model.name}
                        </Link>{" "}
                        ({model.object_name})
                        {model.perms && model.perms.length > 0 && (
                          <span className="text-sm text-gray-500">
                            {" "}
                            - Permissions: {model.perms.join(", ")}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
