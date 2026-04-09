import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { EmptyState } from './idea-empty-state'

export function IdeasContainer() {
  return (
    <div className='flex-1 rounded-sm p-4'>
      <h3 className='font-bold text-xl'>Create Ideas</h3>
      <div className='my-5'>
        <Tabs defaultValue='ideas'>
          <div className='border-b border-border'>
            <TabsList className='gap-6'>
              <TabsTrigger value='ideas'>Ideas</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='ideas' className='mt-6'>
            <EmptyState />
          </TabsContent>
          <TabsContent value='analytics' className='mt-6'>
            {/* analytics content */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
