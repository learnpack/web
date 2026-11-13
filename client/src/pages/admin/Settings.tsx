import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold" data-testid="heading-settings">Admin Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure system settings and preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>Manage system-wide settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Settings panel coming soon. This will include system configuration options.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
