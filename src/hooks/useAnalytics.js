import { useState, useEffect } from "react";
import { getUserAnalytics } from "../api/analytics.api";
import { useAuth } from "../context/AuthContext";

export function useAnalytics(days = 7, selectedLinkIds = []) {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const selectedLinkIdsStr = selectedLinkIds && selectedLinkIds.length > 0 ? selectedLinkIds.join(",") : "";

  useEffect(() => {
    if (!user) return;
    
    let isMounted = true;
    
    async function fetchAnalytics() {
      try {
        setLoading(true);
        const stats = await getUserAnalytics({ days, linkIds: selectedLinkIdsStr });
        if (isMounted) {
          setData(stats);
        }
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    
    fetchAnalytics();
    
    return () => {
      isMounted = false;
    };
  }, [user, days, selectedLinkIdsStr]);

  return { data, loading };
}
