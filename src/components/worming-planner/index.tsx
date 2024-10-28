"use client";

import React, { useState, useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AppointmentWindow {
  earliest: Date;
  latest: Date;
}

const WormingScheduler: React.FC = () => {
  const [travelDate, setTravelDate] = useState<string>('');

  // Calculate the valid appointment window
  const appointmentWindow = useMemo<AppointmentWindow | null>(() => {
    if (!travelDate) return null;

    const arrival = new Date(travelDate);
    const earliestAppointment = new Date(arrival);
    earliestAppointment.setHours(arrival.getHours() - 120);
    const latestAppointment = new Date(arrival);
    latestAppointment.setHours(arrival.getHours() - 24);

    return {
      earliest: earliestAppointment,
      latest: latestAppointment,
    };
  }, [travelDate]);

  // Determine alert background color
  const alertBackgroundColor = travelDate ? "bg-green-100" : "bg-red-100";

  // Format dates for display
  const formatDateTime = (date: Date | undefined): string =>
    date?.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) ?? '';

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-center text-3xl font-bold underline">
            <Calendar className="w-6 h-6" />
            Canine Travel Worming Planner
          </CardTitle>
          <div className="mt-4"></div> {/* Extra space below the title */}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Information Text */}
          <div className="text-gray-700 space-y-4 mb-6">
            <p className="leading-relaxed">
              If you are entering <strong>Ireland, Northern Ireland, Norway, Finland, or Malta</strong> with a <strong>dog</strong>, it will need to receive a <strong>worming treatment</strong> between <strong>24 and 120 hours prior to arrival</strong>, which must be witnessed by a vet and recorded on the <strong>Animal Health Certificate (AHC)</strong>.
            </p>
          </div>

          {/* Travel Date Selection */}
          <div className="space-y-2">
            <label className="block text-lg font-bold">
              Please enter Date and Time of Entry to EU/ Northern Ireland
            </label>
            <input
              type="datetime-local"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Appointment Window Display */}
          <Alert className={alertBackgroundColor}>
            <AlertDescription>
              <div className="space-y-2">
                <div className="font-medium">Valid Appointment Window:</div>
                {appointmentWindow ? (
                  <>
                    <div>Earliest: {formatDateTime(appointmentWindow.earliest)}</div>
                    <div>Latest: {formatDateTime(appointmentWindow.latest)}</div>
                  </>
                ) : (
                  <>
                    <div>Earliest: [Enter arrival date and time]</div>
                    <div>Latest: [Enter arrival date and time]</div>
                  </>
                )}
                <div className="text-sm text-gray-600 mt-2">
                  The worming treatment must be administered and witnessed by a veterinarian between these times and recorded on your Animal Health Certificate.
                </div>
              </div>
            </AlertDescription>
          </Alert>

          {/* Important Information */}
          <div className="text-sm text-gray-600 space-y-3 bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium text-gray-900">Important Information:</h3>
            <ul className="space-y-3 list-disc pl-4">
              <li>Worming only required for dogs (not cats or ferrets)</li>
              
              <li>
                <strong>Returning to the UK:</strong> Dogs need to be wormed before re-entry into Great Britain from any EU country, except if travelling from <strong>Ireland, Northern Ireland, Malta, Finland, or Norway</strong>, where no worming is needed for re-entry.
              </li>
              
              <li>
                For short trips, it is possible to have the worming treatment done before departure if you will return to the UK within <strong>120 hours of the worming</strong> being witnessed and recorded on the Animal Health Certificate. This avoids the need for another worming treatment abroad.
              </li>
              
              <li>
                The treating veterinarian must <strong>record the date and time</strong> of the worming treatment on the <strong>Animal Health Certificate (AHC)</strong>. They also need to record the product name and manufacturer.
              </li>
              
              <li>
                The wormer must be <strong>licensed</strong> (in the country where the wormer is administered) <strong>to treat tapeworms, specifically the Echinococcus multilocularis tapeworm</strong>. The medication should contain <strong>praziquantel</strong> or an equivalent active ingredient that is proven to be effective against Echinococcus multilocularis.
              </li>
              
              <li>
                Please be aware of potential travel delays, as these could cause the worming treatment to fall outside the 120-hour window. If this occurs, a new worming treatment must be administered, witnessed by a vet, and recorded on the AHC. The new treatment will only be valid from 24 hours after it is administered, up to 120 hours.
              </li>

              <li>
                The worming treatment can be administered during the same appointment as the AHC is issued (if an appointment is available), or separately within the required timeframe.
              </li>

              <li>
                The AHC needs to be issued first, so that worming details can be added to the AHC after.
              </li>

              <li>
                It is your responsibility to check that any appointments for worming to be witnessed fit within this time frame.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WormingScheduler;
