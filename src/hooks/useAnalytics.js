import { useState, useEffect } from "react";
import { getUserAnalytics } from "../api/analytics.api";
import { useAuth } from "../context/AuthContext";

export function useAnalytics(days = 7) {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    let isMounted = true;
    
    async function fetchAnalytics() {
      try {
        setLoading(true);
        const stats = await getUserAnalytics({ days });
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
  }, [user, days]);

  return { data, loading };
}
