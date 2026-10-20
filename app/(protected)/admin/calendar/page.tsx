import AdminCalendar from "@/components/admin/calendar/AdminCalendar";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function CalendarPage() {
    return (
        <Suspense fallback={<div>Loading calendar...</div>}>
            <AdminCalendar />
        </Suspense>
    );
}
