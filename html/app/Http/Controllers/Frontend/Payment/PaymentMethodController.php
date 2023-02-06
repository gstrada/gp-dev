<?php
    
    namespace App\Http\Controllers\Frontend\Payment;
    
    use App\Http\Controllers\Controller;
    use App\Models\Payment\PaymentMethod;
    use App\Models\Payment\PaymentMethodCity;
    use App\Models\Payment\PaymentMethodState;
    use Illuminate\Database\Eloquent\Collection;
    use Illuminate\Http\Request;
    
    class PaymentMethodController extends Controller{
        /**
         * Display a listing of the resource.
         * @return \Illuminate\Http\Response
         */
        public function index(){
            //
        }
        
        /**
         * Show the form for creating a new resource.
         * @return \Illuminate\Http\Response
         */
        public function create(){
            //
        }
        
        /**
         * Store a newly created resource in storage.
         * @param \Illuminate\Http\Request $request
         * @return \Illuminate\Http\Response
         */
        public function store(Request $request){
            //
        }
        
        /**
         * Display the specified resource.
         * @param int $id
         * @return \Illuminate\Http\Response
         */
        public function show($id){
            //
        }
        
        /**
         * Show the form for editing the specified resource.
         * @param int $id
         * @return \Illuminate\Http\Response
         */
        public function edit($id){
            //
        }
        
        /**
         * Update the specified resource in storage.
         * @param \Illuminate\Http\Request $request
         * @param int $id
         * @return \Illuminate\Http\Response
         */
        public function update(Request $request, $id){
            //
        }
        
        /**
         * Remove the specified resource from storage.
         * @param int $id
         * @return \Illuminate\Http\Response
         */
        public function destroy($id){
            //
        }
        
        
        public function getForCheckoutPaymentMethods($state_id = null, $city_id = null){
            
            $payment_methods_global = PaymentMethod::where('payment_methods.enabled', 1)
                                                    ->where('payment_methods.removed', 0)
                                                    ->where('payment_methods.enabled_for_all_subitems', 1)
                                                    ->get()
                                                    ->filter();
            
            $payment_methods = new Collection($payment_methods_global);
            
            if($city_id) {
                $payment_methods_by_city = PaymentMethodCity::with([
                    'payment_method' => function($q){
                        $q->where('payment_methods.enabled', 1)->where('payment_methods.removed', 0);
                    },
                ])
                    ->where('payment_method_cities.city_id', '=', $city_id)
                    ->where('payment_method_cities.enabled', '=', 1)
                    ->where('payment_method_cities.removed', '=', 0)
                    ->get()->pluck('payment_method')->filter();
                
                $payment_methods = $payment_methods->merge($payment_methods_by_city);
                
                $payment_methods_by_state = PaymentMethodState::with([
                    'payment_method' => function($q){
                        $q->where('payment_methods.enabled', 1)->where('payment_methods.removed', 0)->where('payment_methods.enabled_for_all_subitems', 1);
                    },
                ])
                    ->where('payment_method_states.state_id', '=', $state_id)
                    ->where('payment_method_states.enabled', '=', 1)
                    ->where('payment_method_states.removed', '=', 0)
                    ->get()->pluck('payment_method')->filter();
                
                
                $payment_methods = $payment_methods->merge($payment_methods_by_state);
                
            } else {
                $payment_methods_by_state = PaymentMethodState::with([
                    'payment_method' => function($q){
                        $q->where('payment_methods.enabled', 1)->where('payment_methods.removed', 0);
                    },
                ])
                    ->where('payment_method_states.state_id', '=', $state_id)
                    ->where('payment_method_states.enabled', '=', 1)
                    ->where('payment_method_states.removed', '=', 0)
                    ->get()->pluck('payment_method')->filter();
                
                //$this->getPaymentMethodsByPrice($payment_methods, $payment_methods_by_state, $userCartTotal);
                
                $payment_methods = $payment_methods->merge($payment_methods_by_state);
            }
            
            return response_json('OK', 200, $payment_methods);
        }
        
    }
