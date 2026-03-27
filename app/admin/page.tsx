"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Check, X, Users, Calendar, MessageSquare, Phone, RefreshCw } from "lucide-react";

interface RSVP {
  id: string;
  name: string;
  phone: string;
  guests: number;
  attending: boolean;
  message: string | null;
  created_at: string;
}

export default function AdminPage() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRSVPs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("rsvps")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setRsvps(data || []);
    } catch (err) {
      console.error("Error fetching RSVPs:", err);
      setError("Failed to load RSVPs. Make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRSVPs();
  }, []);

  const totalGuests = rsvps
    .filter((r) => r.attending)
    .reduce((sum, r) => sum + r.guests, 0);
  
  const attendingCount = rsvps.filter((r) => r.attending).length;
  const notAttendingCount = rsvps.filter((r) => !r.attending).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="font-serif text-2xl text-primary">RSVP Dashboard</h1>
          <button
            onClick={fetchRSVPs}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Total Responses</span>
            </div>
            <p className="text-3xl font-serif text-foreground">{rsvps.length}</p>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-muted-foreground">Attending</span>
            </div>
            <p className="text-3xl font-serif text-foreground">{attendingCount}</p>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <X className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-sm text-muted-foreground">Not Attending</span>
            </div>
            <p className="text-3xl font-serif text-foreground">{notAttendingCount}</p>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <span className="text-sm text-muted-foreground">Total Guests</span>
            </div>
            <p className="text-3xl font-serif text-foreground">{totalGuests}</p>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 mb-8">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-card rounded-xl p-12 border border-border text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading RSVPs...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && rsvps.length === 0 && (
          <div className="bg-card rounded-xl p-12 border border-border text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-serif text-xl text-foreground mb-2">No RSVPs yet</h3>
            <p className="text-muted-foreground">RSVPs will appear here once guests respond.</p>
          </div>
        )}

        {/* RSVP List */}
        {!loading && !error && rsvps.length > 0 && (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Phone</th>
                    <th className="text-center px-6 py-4 text-sm font-medium text-muted-foreground">Guests</th>
                    <th className="text-center px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Message</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-foreground">{rsvp.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <a 
                          href={`tel:${rsvp.phone}`}
                          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          {rsvp.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary/20 text-foreground font-medium">
                          {rsvp.guests}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {rsvp.attending ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm">
                            <Check className="w-3 h-3" />
                            Attending
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 text-red-600 text-sm">
                            <X className="w-3 h-3" />
                            Not Attending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {rsvp.message ? (
                          <p className="text-sm text-muted-foreground max-w-xs truncate" title={rsvp.message}>
                            <MessageSquare className="w-4 h-4 inline mr-1" />
                            {rsvp.message}
                          </p>
                        ) : (
                          <span className="text-muted-foreground/50 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(rsvp.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
