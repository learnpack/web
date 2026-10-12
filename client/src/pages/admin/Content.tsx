import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Content() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold" data-testid="heading-content">Content Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage and publish content for the LearnPack platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Items</CardTitle>
          <CardDescription>View and manage all published content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            No content items yet. This section will be populated with content management features.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
