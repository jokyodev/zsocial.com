import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function IdeasContainer() {
  return (
    <div className='flex-1 bg-white rounded-sm p-4 '>
      <div className='h-14'>
        <h3 className='font-bold text-xl'>Create Ideas</h3>
        <div className='my-5  border-b'>
          <Tabs defaultValue='ideas'>
            <TabsList variant='line'>
              <TabsTrigger value='ideas'>Ideas</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
