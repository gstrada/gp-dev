<?php
namespace App\Exports;


use App\Models\Card\Card;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class CardsExport implements FromCollection,WithHeadings
{

    protected $orderItem;

    public function __construct(int $orderItem)
    {
        $this->orderItem = $orderItem;
    }
    /**
     * @return \Illuminate\Support\Collection
     */
    public function headings(): array
    {
        return [
            'Pack',
            'Código',
            'CVV',
        ];
    }
    public function collection()
    {
        $users = DB::table('cards')->join('order_items', 'order_item_id', '=', 'order_items.id')->select('order_items.id','number', 'cvv')->where('order_items.order_id', $this->orderItem)->get();
//        $users = collect(Card::with('orderItem')->where->get());
//        dd($users);
        return $users;

    }
}
