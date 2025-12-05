import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const events = {
    5: ['NYC Temperature Decision'],
    12: ['London Market Closes', 'Tokyo Forecast Update'],
    18: ['Paris Prediction Due'],
    25: ['Dubai Market Opens']
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-botanical-bark mb-2">Market Calendar</h1>
        <p className="text-botanical-moss">Track important dates and market resolutions</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-botanical-sage/30 shadow-botanical">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-botanical-bark">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={previousMonth}
              className="p-2.5 bg-botanical-cream hover:bg-botanical-moss/20 rounded-xl transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-botanical-bark" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2.5 bg-botanical-cream hover:bg-botanical-moss/20 rounded-xl transition-all"
            >
              <ChevronRight className="w-5 h-5 text-botanical-bark" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-botanical-moss py-2">
              {day}
            </div>
          ))}

          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-24"></div>
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const hasEvents = events[day as keyof typeof events];
            const isToday = day === new Date().getDate() &&
              currentDate.getMonth() === new Date().getMonth() &&
              currentDate.getFullYear() === new Date().getFullYear();

            return (
              <div
                key={day}
                className={`h-24 p-2 rounded-xl border transition-all ${
                  isToday
                    ? 'bg-botanical-fern/10 border-botanical-fern'
                    : hasEvents
                    ? 'bg-botanical-cream border-botanical-sage/40 hover:bg-botanical-moss/10'
                    : 'bg-botanical-petal border-botanical-sage/20 hover:bg-botanical-cream'
                }`}
              >
                <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-botanical-fern' : 'text-botanical-bark'}`}>{day}</div>
                {hasEvents && (
                  <div className="space-y-1">
                    {hasEvents.map((event, idx) => (
                      <div
                        key={idx}
                        className="text-xs bg-botanical-marigold text-botanical-bark px-2 py-1 rounded-lg truncate font-medium"
                        title={event}
                      >
                        {event}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-botanical-sage/30 shadow-botanical">
          <h3 className="text-lg font-display font-bold text-botanical-bark mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {Object.entries(events).map(([day, eventList]) => (
              <div key={day} className="flex items-start gap-3 p-3 bg-botanical-cream rounded-xl">
                <div className="text-2xl font-display font-bold text-botanical-fern">{day}</div>
                <div className="flex-1">
                  {eventList.map((event, idx) => (
                    <p key={idx} className="text-sm text-botanical-bark">{event}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-botanical-sage/30 shadow-botanical">
          <h3 className="text-lg font-display font-bold text-botanical-bark mb-4">Market Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-botanical-cream rounded-xl">
              <span className="text-botanical-moss font-medium">Total Markets</span>
              <span className="text-xl font-display font-bold text-botanical-bark">127</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-botanical-fern/10 rounded-xl">
              <span className="text-botanical-moss font-medium">Active Predictions</span>
              <span className="text-xl font-display font-bold text-botanical-fern">43</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-botanical-marigold/10 rounded-xl">
              <span className="text-botanical-moss font-medium">Resolved This Month</span>
              <span className="text-xl font-display font-bold text-botanical-marigold">18</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
